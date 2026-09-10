import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ReserveFlow } from "./ReserveFlow";

describe("ReserveFlow", () => {
  it("keeps step 1 visible and reports required fields when NEXT is pressed empty", async () => {
    const user = userEvent.setup();

    render(<ReserveFlow />);

    await user.click(screen.getByRole("button", { name: "NEXT" }));

    expect(screen.getByText("店舗を選択してください。")).toBeInTheDocument();
    expect(screen.getByText("メニューを選択してください。")).toBeInTheDocument();
    expect(screen.getByText("希望日を選択してください。")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "1. SELECT" })).toBeInTheDocument();
  });

  it("clears a selected staff member when the salon changes", async () => {
    const user = userEvent.setup();

    render(<ReserveFlow />);

    await user.selectOptions(screen.getByLabelText("店舗"), "shibuya");
    await user.selectOptions(screen.getByLabelText("担当スタッフ"), "ren-aoki");
    await user.selectOptions(screen.getByLabelText("店舗"), "omotesando");

    expect(screen.getByLabelText("担当スタッフ")).toHaveValue("");
    expect(screen.getByRole("option", { name: "黒沢 陽菜" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "白石 結衣" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "青木 蓮" })).not.toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "橘 美緒" })).not.toBeInTheDocument();
  });

  it("confirms a complete reservation locally and resets without saving it", async () => {
    const user = userEvent.setup();

    render(<ReserveFlow />);

    await user.selectOptions(screen.getByLabelText("店舗"), "shibuya");
    await user.selectOptions(screen.getByLabelText("メニュー"), "one-color");
    await user.selectOptions(screen.getByLabelText("担当スタッフ"), "ren-aoki");
    await user.type(screen.getByLabelText("希望日"), "2099-12-31");
    await user.click(screen.getByRole("button", { name: "NEXT" }));

    expect(screen.getByRole("heading", { name: "2. DETAILS" })).toBeInTheDocument();

    await user.type(screen.getByLabelText("お名前"), "佐藤 ゆみ");
    await user.type(screen.getByLabelText("メールアドレス"), "yumi@example.com");
    await user.click(screen.getByRole("button", { name: "NEXT" }));

    expect(screen.getByRole("heading", { name: "3. CONFIRM" })).toBeInTheDocument();
    expect(screen.getByText("MOOD. SHIBUYA")).toBeInTheDocument();
    expect(screen.getByText("ONE COLOR")).toBeInTheDocument();
    expect(screen.getByText("青木 蓮")).toBeInTheDocument();
    expect(screen.getByText("2099-12-31")).toBeInTheDocument();
    expect(screen.getByText("佐藤 ゆみ")).toBeInTheDocument();
    expect(screen.getByText("yumi@example.com")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "BACK" }));

    expect(screen.getByLabelText("お名前")).toHaveValue("佐藤 ゆみ");
    expect(screen.getByLabelText("メールアドレス")).toHaveValue("yumi@example.com");

    await user.click(screen.getByRole("button", { name: "NEXT" }));
    await user.click(screen.getByRole("button", { name: "COMPLETE" }));

    expect(screen.getByText("予約情報は送信・保存されていません")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "RESET" }));

    expect(screen.getByRole("heading", { name: "1. SELECT" })).toBeInTheDocument();
    expect(screen.getByLabelText("店舗")).toHaveValue("");
  });
});
