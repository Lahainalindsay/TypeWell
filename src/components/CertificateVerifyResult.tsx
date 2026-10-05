"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { readCertificateFromParams } from "../features/certificate/verify";

export function CertificateVerifyResult() {
  const searchParams = useSearchParams();
  const result = readCertificateFromParams(searchParams);
  if (!result) return (
    <div className="cert-verify-card cert-verify-empty">
      <Info size={22} aria-hidden="true" />
      <div><p className="cert-verify-title">No verification link provided</p>
        <p>Open the full verification link from the certificate holder. A Verification ID alone cannot be checked here. Ask them to use the &ldquo;Copy Verification Link&rdquo; button and send you the link directly.</p>
      </div>
    </div>
  );
  const { payload, valid } = result;
  if (!valid) return (
    <div className="cert-verify-card cert-verify-invalid">
      <XCircle size={22} aria-hidden="true" />
      <div><p className="cert-verify-title">This link could not be checked</p>
        <p>The link is incomplete or its values do not match the checksum. It may have been truncated or changed. Ask the certificate holder to re-send the full original link.</p>
      </div>
    </div>
  );
  const metrics = "version" in payload ? payload.metrics : [{ label: "WPM", value: payload.wpm }, { label: "Accuracy", value: `${payload.accuracy}%` }];
  return (
    <div className="cert-verify-card cert-verify-valid">
      <CheckCircle2 size={22} aria-hidden="true" />
      <div><p className="cert-verify-title">Checksum matches — self-administered test result</p>
        <p>These values are consistent with the link&rsquo;s public checksum:</p>
        <dl className="cert-verify-details">
          <div><dt>Name</dt><dd>{payload.name}</dd></div>
          {metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}
          {"version" in payload && <div><dt>Time taken</dt><dd>{payload.duration}</dd></div>}
          {"version" in payload && payload.groups.map((group) => <div key={group.label}><dt>{group.label}</dt><dd>{group.value}</dd></div>)}
          <div><dt>Test</dt><dd>{payload.type}</dd></div>
          <div><dt>Date completed</dt><dd>{payload.completed}</dd></div>
          <div><dt>Verification ID</dt><dd>{payload.id}</dd></div>
        </dl>
        <p className="cert-verify-footnote">Anyone can recalculate this public checksum. A match does not prove that WPMTest issued these results or that they have never been edited. This does not verify identity, test completion, or accreditation.</p>
      </div>
    </div>
  );
}
