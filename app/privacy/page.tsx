import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage, CONTACT_EMAIL } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy - The Swarms Corporation",
  description:
    "How The Swarms Corporation collects, uses, protects, retains, and shares information — including how completions are used to improve our models, your GDPR and CCPA rights, and how to opt out.",
  openGraph: {
    title: "Privacy Policy - The Swarms Corporation",
    description:
      "How The Swarms Corporation collects, uses, protects, and shares information.",
    type: "website",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      current="/privacy"
      title="Privacy Policy"
      intro="This Privacy Policy describes how The Swarms Corporation collects, uses, discloses, retains, and safeguards information in connection with our Services, the legal bases on which we rely, the rights available to you, and the choices you have — including how to opt out of having your Completions used to improve our models."
    >
      <p>
        <strong>Plain-language summary.</strong> We collect the information we
        need to operate the Services and, across all tiers, we use Completions to
        improve our models by default — with personal details removed first. You
        can turn this off at any time using <strong>No Data Tracking</strong>. We
        handle your data with extreme care and{" "}
        <strong>we never sell it to any organization</strong>. The full detail
        follows.
      </p>

      <h2 id="scope">1. Scope and application</h2>
      <p>
        This Privacy Policy (the &ldquo;Policy&rdquo;) applies to The Swarms
        Corporation (&ldquo;Swarms,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) and to our websites, applications, application
        programming interfaces (&ldquo;APIs&rdquo;), marketplace, and related
        products and services (collectively, the &ldquo;Services&rdquo;). It
        applies to individuals who visit our sites, create an account, or
        otherwise interact with the Services. It does not apply to third-party
        products, or to agents, tools, or listings offered by third-party sellers
        in our marketplace, each of which may maintain its own privacy practices
        and may act as an independent controller of data you share with it; nor
        does it apply to data we process solely as a processor on behalf of an
        enterprise customer, which is governed by that customer&rsquo;s agreement
        and instructions.
      </p>

      <h2 id="controller">2. Data controller and contact</h2>
      <p>
        For personal data governed by this Policy, The Swarms Corporation is the
        data controller. You can reach us regarding privacy matters at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Where required by
        law, references to a &ldquo;controller,&rdquo; &ldquo;business,&rdquo;
        &ldquo;processor,&rdquo; or &ldquo;service provider&rdquo; have the
        meanings given under the applicable data protection law.
      </p>

      <h2 id="definitions">3. Key definitions</h2>
      <ul>
        <li>
          <strong>&ldquo;Completions&rdquo;</strong> means the prompts, queries,
          inputs, files, and other content you submit to the Services, together
          with the outputs generated in response.
        </li>
        <li>
          <strong>&ldquo;Personal data&rdquo;</strong> (or &ldquo;personal
          information&rdquo;) means information that identifies, relates to, or
          could reasonably be linked to an identifiable individual.
        </li>
        <li>
          <strong>&ldquo;Processing&rdquo;</strong> means any operation performed
          on data, such as collection, use, storage, disclosure, or deletion.
        </li>
        <li>
          <strong>&ldquo;No Data Tracking&rdquo;</strong> means the control that,
          when enabled, excludes your Completions from being used to train or
          enhance our models.
        </li>
      </ul>

      <h2 id="collect">4. Information we collect</h2>
      <h3>4.1 Information you provide</h3>
      <ul>
        <li>
          <strong>Account and profile data</strong> — such as your name,
          username, email address, organization, and authentication credentials.
        </li>
        <li>
          <strong>Billing data</strong> — such as your subscription tier and
          transaction history. Card payments are handled by third-party payment
          processors; we do not store complete payment card numbers.
        </li>
        <li>
          <strong>Completions</strong> — the prompts, inputs, files, and outputs
          you submit to or generate through the Services.
        </li>
        <li>
          <strong>Communications</strong> — information you share when you contact
          support, respond to surveys, or otherwise correspond with us.
        </li>
      </ul>
      <h3>4.2 Information we collect automatically</h3>
      <ul>
        <li>
          <strong>Usage data</strong> — feature usage, request metadata, session
          activity, and product interactions.
        </li>
        <li>
          <strong>Device and technical data</strong> — IP address, browser and
          device type, operating system, and similar identifiers.
        </li>
        <li>
          <strong>Log and diagnostic data</strong> — event logs, error reports,
          and performance metrics used to operate and secure the Services.
        </li>
        <li>
          <strong>Cookies and similar technologies</strong> — as described in{" "}
          <Link href="#cookies">Section 11</Link>.
        </li>
      </ul>
      <h3>4.3 Information from third parties</h3>
      <p>
        We may receive information from service providers such as payment
        processors, authentication providers, and analytics vendors, and from
        integrations you choose to connect. We combine this with information we
        already hold to operate and improve the Services.
      </p>

      <h2 id="use">5. How we use information</h2>
      <p>We use information for the following purposes:</p>
      <ul>
        <li>
          <strong>Provide the Services</strong> — authenticate users, deliver
          features, and process Completions;
        </li>
        <li>
          <strong>Operate and secure</strong> — monitor performance, prevent
          fraud and abuse, and maintain the integrity of the Services;
        </li>
        <li>
          <strong>Billing and administration</strong> — process payments and
          manage subscriptions;
        </li>
        <li>
          <strong>Improve our models and Services</strong> — as described in{" "}
          <Link href="#training">Section 6</Link> and our{" "}
          <Link href="/data-policy">Data Policy</Link>;
        </li>
        <li>
          <strong>Communicate</strong> — send service, security, and
          transactional messages, and, where permitted, product updates;
        </li>
        <li>
          <strong>Comply and enforce</strong> — meet legal obligations and
          enforce our <Link href="/terms">Terms of Service</Link>.
        </li>
      </ul>

      <h2 id="training">6. Using completions to improve our models</h2>
      <p>
        Across <strong>all subscription tiers — Free, Pro, and Premium — and
        usage-based (credit) access</strong>, we may use Completions to train,
        fine-tune, evaluate, and enhance our models by default. This enables us to
        improve output quality, reliability, safety, and performance for all users.
      </p>
      <p>
        <strong>Removal of personal details.</strong> Before Completions are used
        for model improvement, we apply automated filtering and, where
        appropriate, additional review to omit personal details and other
        directly identifying information, and we aggregate or de-identify data
        where feasible. Our methodology is described in our{" "}
        <Link href="/data-policy">Data Policy</Link>.
      </p>
      <p>
        <strong>Your choice — No Data Tracking.</strong> You may opt out at any
        time by enabling <strong>No Data Tracking</strong> in your account
        settings, or by writing to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. When enabled, your
        Completions are <strong>not</strong> used to train or enhance our models.
        Opting out does not change your price, features, or access to the
        Services.
      </p>

      <h2 id="legal-bases">7. Legal bases for processing (EEA/UK)</h2>
      <p>
        If you are located in the European Economic Area or the United Kingdom, we
        process personal data on the following legal bases under the GDPR:
      </p>
      <ul>
        <li>
          <strong>Contract</strong> — to provide the Services you request and
          perform our agreement with you;
        </li>
        <li>
          <strong>Legitimate interests</strong> — to operate, secure, and improve
          the Services (including model improvement with personal details
          removed), balanced against your rights and interests;
        </li>
        <li>
          <strong>Consent</strong> — where we ask for it, such as for certain
          cookies or communications; you may withdraw consent at any time; and
        </li>
        <li>
          <strong>Legal obligation</strong> — to comply with applicable laws.
        </li>
      </ul>

      <h2 id="sharing">8. How we disclose information</h2>
      <p>
        <strong>We do not sell your personal data to any organization</strong>,
        and we do not share Completions with third parties for their own
        marketing or model-training purposes. We disclose information only as
        follows:
      </p>
      <ul>
        <li>
          <strong>Service providers / processors</strong> — vendors that perform
          services on our behalf (for example, cloud hosting, payment processing,
          and analytics) under written contracts requiring confidentiality,
          security, and use limited to our instructions;
        </li>
        <li>
          <strong>Legal, safety, and compliance</strong> — where reasonably
          necessary to comply with law or valid legal process, to enforce our
          agreements, or to protect the rights, property, and safety of Swarms,
          our users, or the public;
        </li>
        <li>
          <strong>Corporate transactions</strong> — in connection with a merger,
          financing, acquisition, or sale of assets, subject to the commitments
          in this Policy; and
        </li>
        <li>
          <strong>With your direction</strong> — when you instruct us to share
          information, such as through an integration you enable.
        </li>
      </ul>

      <h2 id="security">9. Data security</h2>
      <p>
        We handle your data with extreme care and maintain administrative,
        technical, and organizational safeguards designed to protect it,
        including:
      </p>
      <ul>
        <li>encryption of data in transit and, where appropriate, at rest;</li>
        <li>
          role-based access controls and the principle of least privilege;
        </li>
        <li>network protection, logging, and continuous monitoring;</li>
        <li>
          vendor security review and contractual data-protection obligations; and
        </li>
        <li>internal policies, training, and incident-response procedures.</li>
      </ul>
      <p>
        No method of transmission or storage is completely secure. If we become
        aware of a security incident affecting your personal data, we will notify
        you and the relevant authorities as required by applicable law.
      </p>

      <h2 id="retention">10. Data retention</h2>
      <p>
        We retain personal data for as long as necessary to fulfill the purposes
        described in this Policy — including to provide the Services, comply with
        legal obligations, resolve disputes, and enforce our agreements — after
        which we delete or de-identify it. Retention periods vary by data type
        and context; for example, account data is retained for the life of your
        account, while certain logs are kept for shorter periods. Data excluded
        from training via No Data Tracking is not retained in training datasets.
      </p>

      <h2 id="rights">11. Your privacy rights</h2>
      <p>
        Depending on where you live, you may have some or all of the following
        rights, subject to legal limits and verification of your identity:
      </p>
      <ul>
        <li>
          <strong>Access and portability</strong> — obtain a copy of the personal
          data we hold about you;
        </li>
        <li>
          <strong>Correction</strong> — request that we correct inaccurate or
          incomplete data;
        </li>
        <li>
          <strong>Deletion</strong> — request deletion of your personal data;
        </li>
        <li>
          <strong>Objection and restriction</strong> — object to or restrict
          certain processing, including processing based on legitimate interests;
        </li>
        <li>
          <strong>Opt out of model improvement</strong> — enable No Data Tracking;
        </li>
        <li>
          <strong>Withdraw consent</strong> — where processing is based on
          consent; and
        </li>
        <li>
          <strong>Complain</strong> — lodge a complaint with your local data
          protection authority.
        </li>
      </ul>
      <p>
        To exercise these rights, contact us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will respond
        within the timeframes required by applicable law and will not discriminate
        against you for exercising your rights.
      </p>

      <h2 id="california">12. California privacy disclosures (CCPA/CPRA)</h2>
      <p>
        If you are a California resident, you have the right to know the
        categories and specific pieces of personal information we collect, to
        request deletion or correction, and to opt out of the &ldquo;sale&rdquo;
        or &ldquo;sharing&rdquo; of personal information as those terms are
        defined under California law. <strong>We do not sell or share your
        personal information</strong> within the meaning of the CCPA/CPRA. We do
        not use or disclose sensitive personal information beyond the purposes
        permitted by law. You may exercise your rights, including through an
        authorized agent, by contacting us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will not
        discriminate against you for exercising these rights.
      </p>

      <h2 id="cookies">13. Cookies and analytics</h2>
      <p>
        We and our providers use cookies and similar technologies to operate the
        Services, remember preferences, maintain security, and understand
        aggregate usage. Some cookies are strictly necessary; others help us
        measure and improve performance. You can control non-essential cookies
        through your browser settings or, where available, our cookie controls.
        Disabling certain cookies may affect functionality.
      </p>

      <h2 id="transfers">14. International data transfers</h2>
      <p>
        We may process and store information in countries other than the one in
        which you reside, including the United States. Where we transfer personal
        data internationally, we implement appropriate safeguards required by law,
        such as standard contractual clauses or reliance on an adequacy decision.
      </p>

      <h2 id="automated">15. Automated processing</h2>
      <p>
        The Services generate outputs using AI models. We do not use your personal
        data to make decisions that produce legal or similarly significant effects
        about you without a lawful basis and appropriate safeguards. Model outputs
        may be inaccurate and should be reviewed before you rely on them.
      </p>

      <h2 id="children">16. Children&rsquo;s privacy</h2>
      <p>
        The Services are not directed to, and we do not knowingly collect personal
        information from, children under 13 (or the minimum age required in your
        jurisdiction). If you believe a child has provided us personal
        information, contact us and we will take appropriate steps to delete it.
      </p>

      <h2 id="changes">17. Changes to this Policy</h2>
      <p>
        We may update this Policy from time to time. When we make material
        changes, we will revise the &ldquo;Last updated&rdquo; date above and,
        where appropriate, provide additional notice. Your continued use of the
        Services after changes take effect constitutes acceptance of the updated
        Policy.
      </p>

      <h2 id="contact">18. Contact us</h2>
      <p>
        If you have questions about this Policy or our data practices, or wish to
        exercise your rights, contact us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  )
}
