import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requireString = z.string().min(1, " Required");
const numericRequiredString = requireString.regex(/^\d+$/, "must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine((file) => {
    return !file || (file instanceof File && file.type.startsWith("image/"));
  }, "Must be an Image file")
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).email().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or Url is require",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requireString.refine(
      (value) => locationTypes.includes(value),
      "Invalid Location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || !!data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: requireString.max(100),
    type: requireString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type",
    ),
    companyName: requireString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(
      9,
      "Number can't be longer than 9 degits",
    ),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CraeteJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});
export type JobfilterValues = z.infer<typeof jobFilterSchema>;
