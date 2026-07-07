import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage, CONTACT_EMAIL } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Data Policy - The Swarms Corporation",
  description:
    "A comprehensive explanation of how Swarms uses completions to train and enhance our models, how personal details are removed, our commitment never to sell data, our security and retention practices, and how to opt out with No Data Tracking.",
  openGraph: {
    title: "Data Policy - The Swarms Corporation",
    description:
      "How Swarms uses completions to improve our models, and your choices.",
    type: "website",
  },
}

export default function DataPolicyPage() {
  return (
    <LegalPage
      current="/data-policy"
      title="Data Policy"
      intro="This Data Policy explains, in detail, how we use Completions to train and enhance our models, the safeguards we apply, how we remove personal details, our commitment never to sell your data to any organization, and the controls available to you — including how to opt out at any time with No Data Tracking."
    >
      <p>
        <strong>At a glance.</strong> Across all tiers we use Completions to
        improve our models by default, with personal details removed first. You
        can opt out at any time via <strong>No Data Tracking</strong>. We handle
        your data with extreme care and{" "}
        <strong>we never sell it to any organization</strong>. This Data Policy
        supplements our <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>

      <h2 id="commitment">1. Our commitments</h2>
      <p>
        We improve our models by learning from how the Services are used, and we
        do it responsibly. These commitments govern everything in this Policy:
      </p>
      <ul>
        <li>
          <strong>Extreme care.</strong> We treat your data as sensitive and
          protect it with layered safeguards.
        </li>
        <li>
          <strong>No sale of data.</strong> We never sell, rent, or trade your
          data to any organization.
        </li>
        <li>
          <strong>Personal details removed.</strong> We omit personal details
          before Completions are used for model improvement.
        </li>
        <li>
          <strong>Your control.</strong> You can opt out of model improvement at
          any time, with no effect on price or features.
        </li>
      </ul>

      <h2 id="definitions">2. Definitions</h2>
      <ul>
        <li>
          <strong>&ldquo;Completions&rdquo;</strong> — the prompts, inputs, and
          files you submit and the outputs generated in response.
        </li>
        <li>
          <strong>&ldquo;Model improvement&rdquo;</strong> — training,
          fine-tuning, evaluation, benchmarking, and safety work used to enhance
          our models.
        </li>
        <li>
          <strong>&ldquo;De-identification&rdquo;</strong> — the process of
          removing or obscuring personal details so data is no longer reasonably
          linkable to an individual.
        </li>
        <li>
          <strong>&ldquo;No Data Tracking&rdquo;</strong> — the control that
          excludes your Completions from model improvement.
        </li>
      </ul>

      <h2 id="what">3. What we use for model improvement</h2>
      <p>
        Across <strong>all subscription tiers — Free, Pro, and Premium — and
        usage-based (credit) access</strong>, we may use Completions for model
        improvement by default. This includes
        using prompts, inputs, and outputs to train and fine-tune models, evaluate
        quality and safety, build benchmarks, reduce harmful or biased behavior,
        and improve reliability and performance. Improving our models this way
        benefits everyone who uses the Services.
      </p>

      <h2 id="basis">4. Why we do this</h2>
      <p>
        Model improvement supports our legitimate interest in operating, securing,
        and enhancing the Services, and in delivering safer, higher-quality
        outputs to our users. Where applicable law requires consent for a
        particular processing activity, we rely on consent and honor your choices.
        For enterprise customers, data handling is governed by the applicable
        agreement or data processing addendum.
      </p>

      <h2 id="opt-out">5. Opt out any time: No Data Tracking</h2>
      <p>
        You are always in control. When you enable{" "}
        <strong>No Data Tracking</strong>, your Completions are{" "}
        <strong>not</strong> used for model improvement.
      </p>
      <ul>
        <li>
          <strong>How to enable it.</strong> Turn on No Data Tracking in your
          account settings, or email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </li>
        <li>
          <strong>No downside.</strong> Opting out does not change your price,
          features, usage limits, or access — it only affects whether your
          Completions are used to improve our models.
        </li>
        <li>
          <strong>Effect going forward.</strong> Once enabled, new Completions are
          excluded from training datasets and pipelines.
        </li>
        <li>
          <strong>Historical data.</strong> You may also request removal of
          previously collected training data associated with your account, and we
          will take reasonable steps to honor the request, subject to technical
          and legal limits.
        </li>
      </ul>

      <h2 id="deidentify">6. How we remove personal details</h2>
      <p>
        Before Completions are used for model improvement, we work to omit personal
        details and other directly identifying information — such as names, email
        addresses, phone numbers, physical addresses, government identifiers, and
        account identifiers. Our approach includes:
      </p>
      <ul>
        <li>
          <strong>Automated detection and redaction</strong> of common categories
          of personal and sensitive information;
        </li>
        <li>
          <strong>Filtering and minimization</strong> to exclude data that is not
          needed for model improvement;
        </li>
        <li>
          <strong>Aggregation and anonymization</strong> where feasible, so
          insights are derived without identifying individuals; and
        </li>
        <li>
          <strong>Review</strong>, where appropriate, to strengthen the
          effectiveness of de-identification.
        </li>
      </ul>
      <p>
        No de-identification method is perfect, and we continue to invest in
        improving these safeguards over time.
      </p>

      <h2 id="no-sale">7. We never sell your data</h2>
      <p>
        We do not sell, rent, license, or trade your data — including your
        Completions — to any organization, and we do not disclose your Completions
        to third parties for their own advertising or model-training purposes. Our
        business model does not depend on monetizing your data.
      </p>

      <h2 id="security">8. Security and access governance</h2>
      <p>
        We handle your data with extreme care and apply administrative, technical,
        and organizational safeguards, including encryption in transit and, where
        appropriate, at rest; role-based access controls and least-privilege
        access; segregation of environments; logging and monitoring; and internal
        policies and training. Access to training-related data is limited to
        authorized personnel and systems that require it, and is subject to
        oversight.
      </p>

      <h2 id="providers">9. Service providers and sub-processors</h2>
      <p>
        Where we rely on trusted service providers — for example, for cloud
        hosting and infrastructure — they process data only on our behalf, under
        written contracts requiring confidentiality and security, solely to
        provide services to us. They are not permitted to sell your data or to use
        your Completions to train their own models.
      </p>

      <h2 id="retention">10. Retention and deletion</h2>
      <p>
        We retain data only as long as necessary for the purposes described here
        and to meet legal, security, and operational requirements, after which we
        delete or de-identify it. Completions excluded from model improvement via
        No Data Tracking are not incorporated into training datasets. You may
        request deletion of your account data and, where applicable, removal of
        associated training data by contacting us.
      </p>

      <h2 id="international">11. International processing</h2>
      <p>
        We may process and store data in countries other than your own, including
        the United States. Where we transfer personal data across borders, we
        implement appropriate safeguards consistent with applicable law, as
        described in our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2 id="controls">12. Your controls at a glance</h2>
      <ul>
        <li>
          Enable <strong>No Data Tracking</strong> to exclude Completions from
          model improvement;
        </li>
        <li>Request access to the personal data we hold about you;</li>
        <li>
          Request correction or deletion of your account data and associated
          training data;
        </li>
        <li>
          Object to or restrict certain processing, subject to applicable law; and
        </li>
        <li>Ask us any question about the practices described here.</li>
      </ul>

      <h2 id="relationship">13. Relationship to our other policies</h2>
      <p>
        This Data Policy supplements our{" "}
        <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/terms">Terms of Service</Link>. If there is any conflict
        specifically regarding the use of Completions for model improvement, this
        Data Policy controls; in all other respects, the Privacy Policy governs
        our handling of personal data.
      </p>

      <h2 id="changes">14. Changes to this Policy</h2>
      <p>
        We may update this Data Policy from time to time. When we make material
        changes, we will update the &ldquo;Last updated&rdquo; date above and,
        where appropriate, provide additional notice.
      </p>

      <h2 id="contact">15. Contact us</h2>
      <p>
        For any question about how your data is used, or to exercise your choices,
        contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  )
}
