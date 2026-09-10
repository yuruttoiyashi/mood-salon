import type { SalonSlug } from "@/data/salons";
import { getStaffBySalon } from "@/data/staff";

export type ReservationValues = {
  salonSlug: SalonSlug | "";
  menuItemId: string;
  staffId: string;
  preferredDate: string;
  name: string;
  email: string;
  phone: string;
  note: string;
};

export type ReservationErrors = Partial<
  Record<keyof ReservationValues, string>
>;

export const initialReservationValues: ReservationValues = {
  salonSlug: "",
  menuItemId: "",
  staffId: "",
  preferredDate: "",
  name: "",
  email: "",
  phone: "",
  note: "",
};

export function getTodayIso(now = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isValidIsoDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return false;
  }

  const [, yearValue, monthValue, dayValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function validateSelectStep(
  values: ReservationValues,
  todayIso: string,
): ReservationErrors {
  const errors: ReservationErrors = {};

  if (!values.salonSlug) {
    errors.salonSlug = "店舗を選択してください。";
  }

  if (!values.menuItemId) {
    errors.menuItemId = "メニューを選択してください。";
  }

  if (!values.preferredDate) {
    errors.preferredDate = "希望日を選択してください。";
  } else if (!isValidIsoDate(values.preferredDate)) {
    errors.preferredDate = "希望日の形式を確認してください。";
  } else if (values.preferredDate < todayIso) {
    errors.preferredDate = "今日以降の日付を選択してください。";
  }

  return errors;
}

export function validateDetailsStep(
  values: ReservationValues,
): ReservationErrors {
  const errors: ReservationErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();

  if (!name) {
    errors.name = "お名前を入力してください。";
  }

  if (!email) {
    errors.email = "メールアドレスを入力してください。";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "メールアドレスの形式を確認してください。";
  }

  return errors;
}

export function getAvailableStaff(salonSlug: SalonSlug | "") {
  if (!salonSlug) {
    return [];
  }

  return getStaffBySalon(salonSlug);
}
