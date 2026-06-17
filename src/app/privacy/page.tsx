import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | SAKSHAM.DEV',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base">
      <Nav />
      <main className="flex-grow w-full max-w-[700px] mx-auto px-4 py-16 md:py-24">
        <h1 className="font-display font-bold text-3xl mb-4">Privacy Policy</h1>
        <p className="text-secondary mb-12">Last Updated: June 2026</p>
        
        <div className="prose prose-invert prose-p:text-primary prose-a:text-accent-blue max-w-none">
          <h3>Overview</h3>
          <p>
            This privacy policy applies to all applications and services developed by Saksham Mogha. 
            I believe in privacy by design. My applications collect the absolute minimum amount of data required to function.
          </p>

          <h3>Data Collected</h3>
          <p>
            Depending on the specific app you use, I may collect:
          </p>
          <ul>
            <li>Crash reports and performance diagnostics (anonymized)</li>
            <li>Basic device information (OS version, device model)</li>
          </ul>
          <p>
            I do not collect personally identifiable information (PII) unless you explicitly provide it (e.g., when sending a support email).
          </p>

          <h3>How It&apos;s Used</h3>
          <p>
            Data is strictly used to:
          </p>
          <ul>
            <li>Fix bugs and crashes</li>
            <li>Improve app performance</li>
            <li>Respond to your direct support inquiries</li>
          </ul>

          <h3>Third Parties</h3>
          <p>
            I do not sell, rent, or share your data with ad networks or data brokers. 
            Some apps may use third-party services like Google Play Services for core functionality or error tracking (like Sentry or Firebase Crashlytics).
          </p>

          <h3>Contact</h3>
          <p>
            If you have questions about this policy or your data, please contact me at: <br/>
            <a href="mailto:contact@saksham.dev">contact@saksham.dev</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
