import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage, CONTACT_EMAIL } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terms of Service - The Swarms Corporation",
  description:
    "The terms that govern your use of the Swarms platform, API, and marketplace across the Free, Pro, and Premium tiers — including subscription and usage-based credit billing, marketplace listing and transaction fees, acceptable use, content rights, disclaimers, and dispute resolution.",
  openGraph: {
    title: "Terms of Service - The Swarms Corporation",
    description:
      "The terms that govern your use of the Swarms platform and services.",
    type: "website",
  },
}

export default function TermsOfServicePage() {
  return (
    <LegalPage
      current="/terms"
      title="Terms of Service"
      intro="These Terms of Service govern your access to and use of the Swarms platform, APIs, marketplace, and related services. They include important provisions on billing, acceptable use, ownership of content, disclaimers, limitation of liability, and dispute resolution. Please read them carefully."
    >
      <p>
        <strong>Please note.</strong> These Terms include a limitation of
        liability (<Link href="#liability">Section 16</Link>) and a dispute
        resolution provision with an arbitration agreement and class-action
        waiver (<Link href="#disputes">Section 18</Link>) that affect your legal
        rights. Please review them carefully.
      </p>

      <h2 id="acceptance">1. Agreement to these terms</h2>
      <p>
        These Terms of Service (the &ldquo;Terms&rdquo;) constitute a binding
        agreement between you (&ldquo;you&rdquo; or &ldquo;Customer&rdquo;) and
        The Swarms Corporation (&ldquo;Swarms,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;) governing your access to and use
        of our websites, applications, APIs, marketplace, and related products and
        services (collectively, the &ldquo;Services&rdquo;). By accessing or using
        the Services, or by clicking to accept, you agree to these Terms and to
        our <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/data-policy">Data Policy</Link>, which are incorporated by
        reference. If you do not agree, do not use the Services.
      </p>
      <p>
        If you use the Services on behalf of an organization, you represent that
        you are authorized to bind that organization, and &ldquo;you&rdquo; refers
        to that organization.
      </p>

      <h2 id="definitions">2. Definitions</h2>
      <ul>
        <li>
          <strong>&ldquo;Completions&rdquo;</strong> — the prompts, inputs, and
          files you submit and the outputs generated in response.
        </li>
        <li>
          <strong>&ldquo;Account&rdquo;</strong> — your registration to access the
          Services.
        </li>
        <li>
          <strong>&ldquo;Subscription&rdquo;</strong> — a Free, Pro, or Premium
          plan under which the Services are made available.
        </li>
      </ul>

      <h2 id="eligibility">3. Eligibility and accounts</h2>
      <p>
        You must be at least the age of majority in your jurisdiction and able to
        form a binding contract. You agree to provide accurate registration
        information, keep it current, safeguard your credentials, and remain
        responsible for all activity under your Account. Notify us promptly at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> of any unauthorized
        use or suspected security breach.
      </p>

      <h2 id="services">4. The Services and changes</h2>
      <p>
        Swarms provides infrastructure, tools, and interfaces for building,
        running, and orchestrating autonomous and multi-agent systems, along with
        related products and a marketplace. We may add, modify, suspend, or
        discontinue features at any time. We will use reasonable efforts to notify
        you of material changes that adversely affect your use.
      </p>

      <h2 id="tiers">5. Plans, credits, billing, and renewals</h2>
      <p>
        The Services are offered through <strong>subscriptions</strong> and{" "}
        <strong>usage-based credits</strong>, which may be used separately or
        together. The specific features, usage limits, and pricing applicable to
        you are described at the point of purchase.
      </p>
      <ul>
        <li>
          <strong>Subscription tiers.</strong> Subscriptions are offered across{" "}
          <strong>Free, Pro, and Premium</strong> tiers, each with its own
          features, usage limits, and pricing.
        </li>
        <li>
          <strong>Usage-based credits.</strong> You may purchase prepaid credits
          that are drawn down as you use metered features of the Services.{" "}
          <strong>
            Prepaid credits are purchased in advance and are non-refundable except
            where required by law.
          </strong>{" "}
          We make usage information available to help you monitor consumption, and
          you are responsible for all charges resulting from your use, including
          metered usage associated with the Pro and Premium plans.
        </li>
        <li>
          <strong>Billing.</strong> Paid subscriptions are billed in advance on a
          recurring basis (for example, monthly or annually), and credits are
          charged at the time of purchase, to your designated payment method. You
          authorize us and our payment processors to charge all applicable fees
          and taxes.
        </li>
        <li>
          <strong>Automatic renewal.</strong> Subscriptions renew automatically at
          the end of each billing period unless canceled before renewal. You may
          cancel at any time; cancellation takes effect at the end of the current
          period. Prepaid credits do not renew automatically.
        </li>
        <li>
          <strong>Refunds.</strong> Except where required by law or expressly
          stated, subscription fees and prepaid credits are non-refundable, and
          there are no refunds or credits for partially used periods or unused
          credits.
        </li>
        <li>
          <strong>Price changes.</strong> We may change subscription fees and
          credit pricing; changes apply to subsequent billing periods or purchases
          after reasonable notice.
        </li>
        <li>
          <strong>Taxes.</strong> Fees are exclusive of taxes, which you are
          responsible for except for taxes on our net income.
        </li>
      </ul>

      <h2 id="license">6. License to use the Services</h2>
      <p>
        Subject to these Terms, we grant you a limited, non-exclusive,
        non-transferable, revocable license to access and use the Services for
        your internal business or personal purposes. All rights not expressly
        granted are reserved.
      </p>

      <h2 id="acceptable-use">7. Acceptable use</h2>
      <p>You agree not to, and not to permit others to:</p>
      <ul>
        <li>violate any law or the rights of others;</li>
        <li>
          generate, promote, or distribute content that is unlawful, harmful,
          harassing, defamatory, deceptive, or that facilitates serious harm;
        </li>
        <li>
          attempt to reverse engineer, decompile, or extract the weights, source
          code, or training data of our models, except to the extent permitted by
          law;
        </li>
        <li>
          probe, scan, or test the vulnerability of, or breach the security or
          authentication measures of, the Services;
        </li>
        <li>
          circumvent usage limits, rate limits, or access controls, or use the
          Services to build a competing model or service by improperly copying the
          Services;
        </li>
        <li>
          use the Services to develop or deploy applications in high-risk domains
          without appropriate human oversight and safeguards; or
        </li>
        <li>
          infringe intellectual property or misappropriate confidential
          information.
        </li>
      </ul>

      <h2 id="api">8. API use and rate limits</h2>
      <p>
        If you use our APIs, you agree to comply with applicable documentation and
        rate limits, to secure your API keys, and not to use the APIs in a manner
        that overburdens or disrupts the Services. We may throttle or suspend API
        access to protect the integrity and availability of the Services.
      </p>

      <h2 id="content">9. Your content and completions</h2>
      <p>
        As between you and Swarms, you retain all rights you hold in your
        Completions. You represent that you have the necessary rights to submit
        your Completions and that they do not violate law or these Terms. You are
        solely responsible for your Completions and their use.
      </p>
      <p>
        You grant Swarms a worldwide, non-exclusive license to host, store,
        process, transmit, and display your Completions as necessary to provide,
        secure, and support the Services. Across all tiers, we may also use
        Completions to train, evaluate, and enhance our models, unless you enable{" "}
        <strong>No Data Tracking</strong>; before any such use, personal details
        are omitted. Details and your choices are described in our{" "}
        <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/data-policy">Data Policy</Link>.
      </p>

      <h2 id="feedback">10. Feedback</h2>
      <p>
        If you provide suggestions or feedback about the Services, you grant us a
        perpetual, irrevocable, royalty-free license to use it without
        restriction or obligation to you.
      </p>

      <h2 id="ip">11. Intellectual property</h2>
      <p>
        The Services, including our software, models, user interfaces, and
        trademarks, are owned by Swarms or our licensors and are protected by
        intellectual property laws. Except for the limited license granted to you,
        nothing in these Terms transfers any right, title, or interest in the
        Services to you.
      </p>

      <h2 id="outputs">12. Model outputs and no professional advice</h2>
      <p>
        Outputs are generated by AI and may be inaccurate, incomplete, offensive,
        or otherwise unsuitable for your purpose, and different users may receive
        similar outputs. You are responsible for evaluating outputs and for any
        reliance on them. The Services do not provide legal, financial, medical,
        or other professional advice, and outputs are not a substitute for
        professional judgment.
      </p>

      <h2 id="third-party">13. Third-party services</h2>
      <p>
        The Services may integrate with or link to third-party products. We do not
        control and are not responsible for third-party services, and your use of
        them is governed by their own terms and privacy practices.
      </p>

      <h2 id="termination">14. Term, suspension, and termination</h2>
      <p>
        These Terms remain in effect while you use the Services. You may stop using
        the Services and close your Account at any time. We may suspend or
        terminate your access, with or without notice, if you breach these Terms,
        if required by law, or to protect the Services or other users. Upon
        termination, your license to use the Services ends. Sections that by their
        nature should survive — including ownership, disclaimers, limitation of
        liability, indemnification, and dispute resolution — will survive.
      </p>

      <h2 id="disclaimers">15. Disclaimers</h2>
      <p>
        To the fullest extent permitted by law, the Services are provided
        &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of
        any kind, whether express, implied, or statutory, including implied
        warranties of merchantability, fitness for a particular purpose, title,
        and non-infringement, and any warranties arising from course of dealing or
        usage of trade. We do not warrant that the Services will be uninterrupted,
        error-free, secure, or that outputs will be accurate or reliable.
      </p>

      <h2 id="liability">16. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Swarms and its affiliates,
        officers, employees, and suppliers will not be liable for any indirect,
        incidental, special, consequential, exemplary, or punitive damages, or for
        any loss of profits, revenues, data, goodwill, or business, arising out of
        or relating to the Services, even if advised of the possibility of such
        damages. Our aggregate liability for all claims arising out of or relating
        to the Services will not exceed the greater of the amounts you paid us for
        the Services in the twelve (12) months preceding the event giving rise to
        the claim, or one hundred U.S. dollars (US$100). Some jurisdictions do not
        allow certain limitations, so some of the above may not apply to you.
      </p>

      <h2 id="indemnification">17. Indemnification</h2>
      <p>
        You agree to defend, indemnify, and hold harmless Swarms and its
        affiliates from and against any claims, liabilities, damages, losses, and
        expenses (including reasonable legal fees) arising out of or related to
        your Completions, your use of the Services, or your violation of these
        Terms or applicable law.
      </p>

      <h2 id="disputes">18. Dispute resolution and arbitration</h2>
      <p>
        Please contact us first at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> so we can try to
        resolve any dispute informally. If we cannot, you and Swarms agree that any
        dispute arising out of or relating to these Terms or the Services will be
        resolved by binding individual arbitration, rather than in court, except
        that either party may bring an individual claim in small-claims court or
        seek injunctive relief for intellectual-property or unauthorized-access
        matters. <strong>You and Swarms waive any right to a jury trial and to
        participate in a class or representative action.</strong> This provision
        does not apply where prohibited by law, and you may have the right to opt
        out of arbitration as described in any applicable notice.
      </p>

      <h2 id="export">19. Export controls and sanctions</h2>
      <p>
        You agree to comply with applicable export control and sanctions laws and
        represent that you are not located in, or a resident of, any embargoed
        region, and are not on any restricted-party list.
      </p>

      <h2 id="governing-law">20. Governing law and venue</h2>
      <p>
        These Terms are governed by the laws of the State of Delaware, excluding
        its conflict-of-laws rules. Subject to the arbitration provision above, the
        state and federal courts located in Delaware will have exclusive
        jurisdiction, and you consent to their venue and personal jurisdiction.
      </p>

      <h2 id="misc">21. General terms</h2>
      <ul>
        <li>
          <strong>Force majeure.</strong> We are not liable for delays or failures
          caused by events beyond our reasonable control.
        </li>
        <li>
          <strong>Assignment.</strong> You may not assign these Terms without our
          consent; we may assign them in connection with a merger, acquisition, or
          sale of assets.
        </li>
        <li>
          <strong>Severability and waiver.</strong> If any provision is
          unenforceable, the rest remain in effect; a failure to enforce a
          provision is not a waiver.
        </li>
        <li>
          <strong>Entire agreement.</strong> These Terms, together with the
          policies referenced here, are the entire agreement between you and Swarms
          regarding the Services.
        </li>
        <li>
          <strong>Notices.</strong> We may provide notices via the Services or by
          email; you may contact us at the address below.
        </li>
      </ul>

      <h2 id="marketplace">22. Additional terms for the Marketplace</h2>
      <p>
        The Services include a marketplace where third parties may list and offer
        agents, tools, and related content (&ldquo;Listings&rdquo;) and where users
        may access them. The marketplace operates under a{" "}
        <strong>separate business model</strong> from our subscriptions and
        credits. The following additional terms apply to your use of the
        marketplace and, together with the rest of these Terms, govern that use.
      </p>
      <ul>
        <li>
          <strong>Our role.</strong> Swarms operates the marketplace as a platform
          and intermediary. Unless we expressly state otherwise, arrangements
          relating to a Listing are between the seller and the buyer, Swarms is not
          a party to them, and Swarms is not responsible for Listings provided by
          third parties.
        </li>
        <li>
          <strong>Listing and transaction fees.</strong> We may charge{" "}
          <strong>listing fees and/or transaction fees</strong> in connection with
          the marketplace, as described at the point of listing or sale. Applicable
          fees, and any related taxes, are your responsibility.
        </li>
        <li>
          <strong>Seller responsibilities.</strong> If you list or sell on the
          marketplace, you represent that you have all rights necessary to offer
          your Listing, that it complies with these Terms and applicable law, and
          that it does not infringe the rights of others. You are responsible for
          your Listings, including their descriptions, support, and any terms you
          present to buyers.
        </li>
        <li>
          <strong>Buyer acknowledgements.</strong> Listings offered by third
          parties may be subject to the seller&rsquo;s own terms and privacy
          practices and may involve data handling by the seller that this agreement
          does not govern. You are responsible for reviewing a Listing before using
          it.
        </li>
        <li>
          <strong>Content and conduct.</strong> Listings must comply with the
          acceptable-use requirements in{" "}
          <Link href="#acceptable-use">Section 7</Link>. We may review, remove, or
          suspend Listings, and suspend marketplace access, for violations of these
          Terms or applicable law.
        </li>
        <li>
          <strong>No endorsement.</strong> The availability of a Listing does not
          constitute an endorsement by Swarms, and we make no warranty regarding
          third-party Listings.
        </li>
      </ul>

      <h2 id="changes">23. Changes to these terms</h2>
      <p>
        We may update these Terms from time to time. When we make material
        changes, we will update the &ldquo;Last updated&rdquo; date above and,
        where appropriate, provide additional notice. Your continued use of the
        Services after changes take effect constitutes acceptance.
      </p>

      <h2 id="contact">24. Contact us</h2>
      <p>
        Questions about these Terms? Contact us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  )
}
