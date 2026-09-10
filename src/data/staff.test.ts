import { describe, expect, it } from "vitest";
import { hairStyles } from "./styles";
import { salons } from "./salons";
import { getStaffById, getStaffBySalon, staffMembers } from "./staff";

describe("staffMembers", () => {
  it("defines six fictional staff members, two per salon", () => {
    expect(staffMembers).toHaveLength(6);
    for (const salon of salons) {
      expect(getStaffBySalon(salon.slug)).toHaveLength(2);
    }
  });

  it("keeps staff and style relationships valid", () => {
    const styleIds = new Set(hairStyles.map(({ id }) => id));
    const staffIds = new Set(staffMembers.map(({ id }) => id));

    for (const member of staffMembers) {
      expect(member.specialties.length).toBeGreaterThan(0);
      expect(member.styleIds.length).toBeGreaterThan(0);
      expect(member.styleIds.every((id) => styleIds.has(id))).toBe(true);
    }

    expect(hairStyles.every(({ staffId }) => staffIds.has(staffId))).toBe(true);
  });

  it("looks up known and unknown staff IDs explicitly", () => {
    expect(getStaffById("ren-aoki")?.name).toBe("青木 蓮");
    expect(getStaffById("unknown")).toBeUndefined();
  });
});
