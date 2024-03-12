import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Flow Jobs</h3>
            <p className="text-sm text-muted-foreground">
              Connecting talents with opportunities
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Services
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="flex-col items-center justify-between space-y-2 text-center text-sm text-muted-foreground md:flex">
          <div className="flex-shrink-0   text-center md:text-start">
            Created by Ubaid
          </div>
          <div className="flex-grow">
            &copy; {new Date().getFullYear()} Flow Jobs, Inc. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
