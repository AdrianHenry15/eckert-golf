import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "How Eckert Golf handles website inquiries, analytics, security verification, and privacy choices.",
    alternates: {
        canonical: "/privacy",
    },
};

const linkClass = "font-medium text-primary underline underline-offset-4";

export default function PrivacyPage() {
    return (
        <main className="mx-auto w-full max-w-3xl space-y-10 px-6 py-14 leading-relaxed text-foreground sm:py-20">
            <header className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>

                <p className="text-sm text-muted-foreground">Last updated: November 26, 2026</p>

                <p>
                    This notice explains how information is handled when you visit eckertgolf.com or submit an inquiry
                    through the website. Eckert Golf Sales, Inc. (“Eckert Golf”) operates the website and handles
                    customer inquiries. Third Generation Studios develops and maintains the website for Eckert Golf.
                </p>
            </header>

            <section className="space-y-4" aria-labelledby="information-heading">
                <h2 id="information-heading" className="text-2xl font-semibold">
                    Information you provide
                </h2>

                <p>
                    Contact and equipment quote requests include the name, email address, phone number, selected
                    equipment, and comments you provide. Parts and service requests may also include your company name,
                    shipping address, equipment model, serial number, and part numbers.
                </p>

                <p>
                    Please provide only information relevant to your request. Do not submit payment card numbers,
                    passwords, or other sensitive information through these forms.
                </p>
            </section>

            <section className="space-y-4" aria-labelledby="use-heading">
                <h2 id="use-heading" className="text-2xl font-semibold">
                    How information is used
                </h2>

                <p>
                    Eckert Golf uses inquiry information to respond to questions, discuss equipment and parts, prepare
                    quotes, arrange requested services, and follow up about your request. Submitting an inquiry does not
                    automatically subscribe you to a marketing mailing list.
                </p>

                <p>
                    Technical information is also processed to deliver the website, investigate errors, prevent abuse,
                    and maintain security. Optional analytics helps us understand website usage and improve navigation
                    and content.
                </p>
            </section>

            <section className="space-y-4" aria-labelledby="providers-heading">
                <h2 id="providers-heading" className="text-2xl font-semibold">
                    Hosting, email delivery, and website support
                </h2>

                <ul className="list-disc space-y-4 pl-6">
                    <li>
                        <strong>Vercel</strong> hosts the website and processes requests to its pages and forms. Hosting
                        and security logs may include IP addresses, browser information, requested URLs, timestamps, and
                        diagnostic information.
                    </li>

                    <li>
                        <strong>Resend</strong> delivers form submissions by email to the team handling your inquiry.
                        This involves processing the information included in your submission, email addresses, and
                        delivery information.
                    </li>

                    <li>
                        <strong>Third Generation Studios</strong> provides technical maintenance and support for Eckert
                        Golf. Access to website information may be needed to investigate delivery problems, troubleshoot
                        errors, or maintain the service.
                    </li>
                </ul>

                <p>
                    You can read the{" "}
                    <a href="https://vercel.com/legal/privacy-notice" className={linkClass}>
                        Vercel Privacy Notice
                    </a>{" "}
                    and{" "}
                    <a href="https://resend.com/legal/privacy-policy" className={linkClass}>
                        Resend Privacy Policy
                    </a>{" "}
                    for information about those providers.
                </p>
            </section>

            <section className="space-y-4" aria-labelledby="security-heading">
                <h2 id="security-heading" className="text-2xl font-semibold">
                    Cloudflare Turnstile verification
                </h2>

                <p>
                    Our forms use Cloudflare Turnstile to help distinguish legitimate visitors from automated abuse.
                    Cloudflare processes technical browser, device, and network signals for this verification. Our
                    server checks the verification result before sending your inquiry.
                </p>

                <p>
                    Turnstile serves a security purpose and operates separately from optional Google Analytics. Learn
                    more in the{" "}
                    <a href="https://www.cloudflare.com/turnstile-privacy-policy/" className={linkClass}>
                        Cloudflare Turnstile Privacy Addendum
                    </a>
                    .
                </p>
            </section>

            <section className="space-y-4" aria-labelledby="analytics-heading">
                <h2 id="analytics-heading" className="text-2xl font-semibold">
                    Optional Google Analytics
                </h2>

                <p>
                    When you accept optional analytics, the website loads Google Analytics 4 to measure page visits,
                    clicks on phone links, and successful inquiry submissions. Google Analytics may use cookies and
                    process online identifiers, browser and device information, referral information, and approximate
                    location.
                </p>

                <p>
                    Our custom analytics events do not include your name, email address, phone number, shipping address,
                    equipment serial number, or message contents. Our page-view events exclude URL query strings and
                    fragments. Google signals and advertising personalization are disabled in our website configuration.
                </p>

                <p>
                    Analytics is not loaded through our integration unless you accept optional analytics. You can
                    decline it and continue browsing or submitting inquiries.
                </p>

                <p>
                    More information is available in{" "}
                    <a href="https://policies.google.com/privacy" className={linkClass}>
                        Google’s Privacy Policy
                    </a>
                    .
                </p>
            </section>

            <section className="space-y-4" aria-labelledby="preferences-heading">
                <h2 id="preferences-heading" className="text-2xl font-semibold">
                    Cookies, local storage, and your choices
                </h2>

                <p>
                    We use browser storage to remember your privacy selection and website preferences, such as your
                    selected theme. Optional analytics may store additional cookies after you accept it.
                </p>

                <p>
                    Open Website settings and select Cookie preferences to review or change your selection. Choosing
                    essential-only or rejecting optional cookies stops further analytics events through our integration.
                    Withdrawing consent does not erase information already sent to Google.
                </p>

                <p>
                    You can also manage cookies and local storage through your browser. Clearing website storage removes
                    saved preferences and may cause the privacy prompt to appear again.
                </p>
            </section>

            <section className="space-y-4" aria-labelledby="retention-heading">
                <h2 id="retention-heading" className="text-2xl font-semibold">
                    Retention and security
                </h2>

                <p>
                    Inquiry information may remain in business email and related records while needed to handle your
                    request, maintain customer records, or meet applicable recordkeeping requirements. Service providers
                    apply their own retention settings and policies to the information they process.
                </p>

                <p>
                    We use safeguards intended to protect website information, but no internet transmission or storage
                    system can be guaranteed completely secure.
                </p>
            </section>

            <section className="space-y-4" aria-labelledby="external-heading">
                <h2 id="external-heading" className="text-2xl font-semibold">
                    External websites and media
                </h2>

                <p>
                    Manufacturer resources, financing providers, social media, and other external links lead to services
                    with their own privacy practices. Where third-party media is embedded, its provider may receive
                    technical information when that content loads or is used.
                </p>
            </section>

            <section className="space-y-4" aria-labelledby="contact-heading">
                <h2 id="contact-heading" className="text-2xl font-semibold">
                    Privacy questions and requests
                </h2>

                <p>
                    Contact Eckert Golf to ask about this notice or request access to, correction of, or deletion of
                    information you submitted. We may need to verify your identity, and some records may need to be
                    retained for legitimate business or legal reasons. Applicable privacy rights depend on your location
                    and circumstances.
                </p>

                <address className="space-y-2 not-italic">
                    <p className="font-semibold">Eckert Golf Sales, Inc.</p>
                    <p>
                        5415 Lake Howell Road #190
                        <br />
                        Winter Park, FL 32792
                    </p>
                    <p>
                        <a href="tel:+14076297968" className={linkClass}>
                            (407) 629-7968
                        </a>
                    </p>
                    <p>
                        <Link href="/contact" className={linkClass}>
                            Contact Eckert Golf
                        </Link>
                    </p>
                </address>

                <p>
                    We may update this notice as website services or practices change. The date above identifies the
                    latest revision.
                </p>
            </section>
        </main>
    );
}
