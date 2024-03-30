"use client";

import { formatMoney } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "./Markdown";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";

interface JobDetailsPageProps {
  job: Job;
}

export default function JobDetailsPage({
  job: {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    location,
    locationtype,
    salary,
    companyLogoUrl,
    applicationEmail,
  },
}: JobDetailsPageProps) {
  const [showButtons, setShowButtons] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email");
    notFound();
  }
  useEffect(() => {
    const checkDescriptionSize = () => {
      if (descriptionRef.current) {
        const descriptionHeight = descriptionRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        if (descriptionHeight > windowHeight) {
          setShowButtons(true);
        } else {
          setShowButtons(false);
        }
      }
    };

    checkDescriptionSize();

    window.addEventListener("resize", checkDescriptionSize);
    return () => window.removeEventListener("resize", checkDescriptionSize);
  }, [description]);

  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt="Company logo"
            width={100}
            height={100}
            className="rounded-xl"
          />
        )}
        <div className="">
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className="text-green-500 hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {type}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {locationtype}
            </p>
            <p className="flex items-center gap-1.5 ">
              <Globe2 size={16} className="shrink-0" />
              {location || "Worlwide"}
            </p>
            <p className="flex items-center gap-1.5 ">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(salary)}
            </p>
          </div>
        </div>
      </div>
      {showButtons && (
        <div className="flex justify-center md:hidden">
          <Button asChild>
            <a href={applicationLink} className="w-40 md:w-fit">
              Apply now
            </a>
          </Button>
        </div>
      )}
      <div ref={descriptionRef}>
        {description && <Markdown>{description}</Markdown>}
      </div>
      {showButtons && (
        <div className="hidden md:flex md:justify-center">
          <Button asChild>
            <a href={applicationLink} className="w-40 md:w-fit">
              Apply now
            </a>
          </Button>
        </div>
      )}
    </section>
  );
}
