"use client";

import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { menuItems } from "@/data/menus";
import { salons, type SalonSlug } from "@/data/salons";
import { staffMembers } from "@/data/staff";
import {
  getAvailableStaff,
  getTodayIso,
  initialReservationValues,
  validateDetailsStep,
  validateSelectStep,
  type ReservationErrors,
  type ReservationValues,
} from "@/lib/reservation";
import styles from "./reserve-flow.module.css";

export function ReserveFlow() {
  const [step, setStep] = useState<1 | 2 | 3 | "complete">(1);
  const [values, setValues] = useState<ReservationValues>(initialReservationValues);
  const [errors, setErrors] = useState<ReservationErrors>({});
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function clearError(field: keyof ReservationValues) {
    setErrors((current) => {
      const remainingErrors = { ...current };
      delete remainingErrors[field];
      return remainingErrors;
    });
  }

  function handleSalonChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextSalon = event.target.value as SalonSlug | "";
    const staffStillAvailable = getAvailableStaff(nextSalon).some(
      ({ id }) => id === values.staffId,
    );
    setValues((current) => ({
      ...current,
      salonSlug: nextSalon,
      staffId: staffStillAvailable ? current.staffId : "",
    }));
    clearError("salonSlug");
  }

  function handleFieldChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const field = event.target.name as keyof ReservationValues;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    clearError(field);
  }

  function handleNext() {
    if (step === 1) {
      const nextErrors = validateSelectStep(values, getTodayIso());
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length === 0) setStep(2);
      return;
    }

    if (step === 2) {
      const nextErrors = validateDetailsStep(values);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length === 0) setStep(3);
    }
  }

  function handleBack() {
    setErrors({});
    setStep(step === 3 ? 2 : 1);
  }

  function handleReset() {
    setValues(initialReservationValues);
    setErrors({});
    setStep(1);
  }

  const selectedSalon = salons.find((salon) => salon.slug === values.salonSlug);
  const selectedMenu = menuItems.find((item) => item.id === values.menuItemId);
  const selectedStaff = staffMembers.find((member) => member.id === values.staffId);

  return (
    <section className={styles.flow} aria-labelledby="reserve-step-heading">
      {step === 1 ? (
        <>
          <h2 ref={headingRef} id="reserve-step-heading" className={styles.heading} tabIndex={-1}>
            1. SELECT
          </h2>
          {Object.keys(errors).length > 0 ? (
            <div className={styles.errorSummary} role="alert"><p>入力内容を確認してください。</p></div>
          ) : null}
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="salon">店舗</label>
              <select id="salon" name="salonSlug" value={values.salonSlug} onChange={handleSalonChange} aria-invalid={Boolean(errors.salonSlug)} aria-describedby={errors.salonSlug ? "salon-error" : undefined}>
                <option value="">店舗を選択</option>
                {salons.map((salon) => <option key={salon.slug} value={salon.slug}>{salon.name}</option>)}
              </select>
              {errors.salonSlug ? <p id="salon-error">{errors.salonSlug}</p> : null}
            </div>
            <div className={styles.field}>
              <label htmlFor="menu">メニュー</label>
              <select id="menu" name="menuItemId" value={values.menuItemId} onChange={handleFieldChange} aria-invalid={Boolean(errors.menuItemId)} aria-describedby={errors.menuItemId ? "menu-error" : undefined}>
                <option value="">メニューを選択</option>
                {menuItems.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              {errors.menuItemId ? <p id="menu-error">{errors.menuItemId}</p> : null}
            </div>
            <div className={styles.field}>
              <label htmlFor="staff">担当スタッフ</label>
              <select id="staff" name="staffId" value={values.staffId} onChange={handleFieldChange}>
                <option value="">指名なし</option>
                {getAvailableStaff(values.salonSlug).map((staff) => <option key={staff.id} value={staff.id}>{staff.name}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="preferred-date">希望日</label>
              <input id="preferred-date" name="preferredDate" type="date" value={values.preferredDate} min={getTodayIso()} onChange={handleFieldChange} aria-invalid={Boolean(errors.preferredDate)} aria-describedby={errors.preferredDate ? "preferred-date-error" : undefined} />
              {errors.preferredDate ? <p id="preferred-date-error">{errors.preferredDate}</p> : null}
            </div>
          </div>
          <div className={styles.actions}><button type="button" onClick={handleNext}>NEXT</button></div>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <h2 ref={headingRef} id="reserve-step-heading" className={styles.heading} tabIndex={-1}>2. DETAILS</h2>
          {Object.keys(errors).length > 0 ? (
            <div className={styles.errorSummary} role="alert"><p>入力内容を確認してください。</p></div>
          ) : null}
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="name">お名前</label>
              <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={handleFieldChange} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
              {errors.name ? <p id="name-error">{errors.name}</p> : null}
            </div>
            <div className={styles.field}>
              <label htmlFor="email">メールアドレス</label>
              <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleFieldChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
              {errors.email ? <p id="email-error">{errors.email}</p> : null}
            </div>
            <div className={styles.field}>
              <label htmlFor="phone">電話番号（任意）</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={handleFieldChange} />
            </div>
            <div className={`${styles.field} ${styles.noteField}`}>
              <label htmlFor="note">ご要望（任意）</label>
              <textarea id="note" name="note" value={values.note} onChange={handleFieldChange} rows={4} />
            </div>
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={handleBack}>BACK</button>
            <button type="button" onClick={handleNext}>NEXT</button>
          </div>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <h2 ref={headingRef} id="reserve-step-heading" className={styles.heading} tabIndex={-1}>3. CONFIRM</h2>
          <dl className={styles.confirmation}>
            <div><dt>店舗</dt><dd>{selectedSalon?.name ?? "未指定"}</dd></div>
            <div><dt>メニュー</dt><dd>{selectedMenu?.name ?? "未指定"}</dd></div>
            <div><dt>担当スタッフ</dt><dd>{selectedStaff?.name ?? "未指定"}</dd></div>
            <div><dt>希望日</dt><dd>{values.preferredDate || "未指定"}</dd></div>
            <div><dt>お名前</dt><dd>{values.name.trim() || "未指定"}</dd></div>
            <div><dt>メールアドレス</dt><dd>{values.email.trim() || "未指定"}</dd></div>
            <div><dt>電話番号</dt><dd>{values.phone.trim() || "未指定"}</dd></div>
            <div><dt>ご要望</dt><dd>{values.note.trim() || "未指定"}</dd></div>
          </dl>
          <div className={styles.actions}>
            <button type="button" onClick={handleBack}>BACK</button>
            <button type="button" onClick={() => setStep("complete")}>COMPLETE</button>
          </div>
        </>
      ) : null}

      {step === "complete" ? (
        <>
          <h2 ref={headingRef} id="reserve-step-heading" className={styles.heading} tabIndex={-1}>RESERVATION COMPLETE</h2>
          <div className={styles.completion}>
            <p>デモの確認が完了しました。</p>
            <p>予約情報は送信・保存されていません</p>
          </div>
          <div className={styles.actions}><button type="button" onClick={handleReset}>RESET</button></div>
        </>
      ) : null}
    </section>
  );
}
