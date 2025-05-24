import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const ShieldIcon = getIcon('Shield');
const InfoIcon = getIcon('Info');
const LockIcon = getIcon('Lock');
const EyeIcon = getIcon('Eye');
const DatabaseIcon = getIcon('Database');

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl">
            <ShieldIcon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            <p className="text-surface-600 dark:text-surface-400 mt-1">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <InfoIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-1">
                  Your Privacy Matters
                </h3>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  SimpliDo respects your privacy and is committed to protecting your personal data. 
                  This privacy policy explains how we handle your information.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <DatabaseIcon className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-50 dark:bg-surface-800/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Local Data Storage</h3>
                <p>SimpliDo stores your tasks and preferences locally in your browser's localStorage. This data never leaves your device and is not transmitted to any servers.</p>
              </div>
              <div className="bg-surface-50 dark:bg-surface-800/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Theme Preferences</h3>
                <p>We store your theme preference (light/dark mode) to provide a consistent experience across sessions.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <LockIcon className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">How We Protect Your Data</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>All data is stored locally on your device - we have no access to your tasks or personal information</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>No user accounts, registration, or login required</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>No tracking, analytics, or data collection</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>No cookies or external data sharing</span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <EyeIcon className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Third-Party Services</h2>
            </div>
            <p className="mb-4">SimpliDo does not use any third-party services that collect or process your personal data. The application runs entirely in your browser.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="mb-4">Since all data is stored locally on your device, you have complete control over your information:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>You can clear your data at any time by clearing your browser's localStorage</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>You can export or backup your data manually</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>No data is retained by us since we don't collect it</span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className="bg-surface-50 dark:bg-surface-800/50 p-4 rounded-lg mt-4">
              <p className="font-mono text-sm">privacy@simplido.app</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;