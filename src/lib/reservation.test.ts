import { describe, expect, it } from "vitest";
import {
  getAvailableStaff,
  getTodayIso,
  initialReservationValues,
  validateDetailsStep,
  validateSelectStep,
} from "./reservation";

describe("reservation validation", () => {
  it("requires a salon, menu, and preferred date before continuing", () => {
    expect(validateSelectStep(initialReservationValues, "2026-09-10")).toEqual({
      salonSlug: "店舗を選択してください。",
      menuItemId: "メニューを選択してください。",
      preferredDate: "希望日を選択してください。",
    });
  });

  it("rejects a preferred date before today", () => {
    expect(
      validateSelectStep(
        {
          ...initialReservationValues,
          salonSlug: "shibuya",
          menuItemId: "one-color",
          preferredDate: "2026-09-09",
        },
        "2026-09-10",
      ),
    ).toEqual({
      preferredDate: "今日以降の日付を選択してください。",
    });
  });

  it("rejects a preferred date outside YYYY-MM-DD format", () => {
    expect(
      validateSelectStep(
        {
          ...initialReservationValues,
          salonSlug: "shibuya",
          menuItemId: "one-color",
          preferredDate: "2026/09/12",
        },
        "2026-09-10",
      ),
    ).toEqual({
      preferredDate: "希望日の形式を確認してください。",
    });
  });

  it("rejects a preferred date that is not a real calendar day", () => {
    expect(
      validateSelectStep(
        {
          ...initialReservationValues,
          salonSlug: "shibuya",
          menuItemId: "one-color",
          preferredDate: "2026-09-31",
        },
        "2026-09-10",
      ),
    ).toEqual({
      preferredDate: "希望日の形式を確認してください。",
    });
  });

  it("accepts complete select values", () => {
    expect(
      validateSelectStep(
        {
          ...initialReservationValues,
          salonSlug: "shibuya",
          menuItemId: "one-color",
          preferredDate: "2026-09-10",
        },
        "2026-09-10",
      ),
    ).toEqual({});
  });

  it("rejects an invalid email address", () => {
    expect(
      validateDetailsStep({
        ...initialReservationValues,
        name: "佐藤 ゆみ",
        email: "invalid",
      }),
    ).toEqual({ email: "メールアドレスの形式を確認してください。" });
  });

  it("requires a name and email address before continuing", () => {
    expect(validateDetailsStep(initialReservationValues)).toEqual({
      name: "お名前を入力してください。",
      email: "メールアドレスを入力してください。",
    });
  });

  it("accepts complete detail values after trimming whitespace", () => {
    expect(
      validateDetailsStep({
        ...initialReservationValues,
        name: " 佐藤 ゆみ ",
        email: " yumi@example.com ",
      }),
    ).toEqual({});
  });

  it("returns staff only for a selected salon", () => {
    expect(getAvailableStaff("shibuya")).toHaveLength(2);
    expect(getAvailableStaff("")).toEqual([]);
  });

  it("formats the local calendar date without UTC rollover", () => {
    expect(getTodayIso(new Date(2026, 8, 10, 23, 30))).toBe("2026-09-10");
  });
});
