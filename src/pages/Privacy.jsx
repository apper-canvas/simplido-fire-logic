import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const ArrowLeftIcon = getIcon('ArrowLeft');

const Privacy = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-6">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
      
      <div className="card">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Privacy Policy</h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <div className="prose prose-aqua dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              SimpliDo ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
              use, and safeguard your information when you use our todo list application.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-medium mb-3">Local Storage Data</h3>
            <p className="mb-4">
              SimpliDo stores your tasks and preferences locally in your browser's storage. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Task content and descriptions</li>
              <li>Task completion status</li>
              <li>Creation and modification dates</li>
              <li>Theme preferences (light/dark mode)</li>
              <li>Filter preferences</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-3">Data We Do NOT Collect</h3>
            <p className="mb-4">We do not collect, store, or transmit:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Personal identifying information</li>
              <li>Email addresses or contact information</li>
              <li>Location data</li>
              <li>Browsing history or cookies</li>
              <li>Any data to external servers</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">
              The information stored locally is used solely to:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Display your tasks and maintain your todo list</li>
              <li>Remember your theme preferences</li>
              <li>Persist your data between browser sessions</li>
              <li>Provide filtering and organization features</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Data Storage and Security</h2>
            <p className="mb-4">
              Your data is stored exclusively in your browser's local storage. This means:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Your data never leaves your device</li>
              <li>We have no access to your tasks or personal information</li>
              <li>Your data is only accessible on the device and browser where you created it</li>
              <li>Clearing your browser data will permanently delete your tasks</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Third-Party Services</h2>
            <p className="mb-4">
              SimpliDo does not integrate with any third-party services that collect user data. 
              The application runs entirely in your browser without external dependencies that could compromise your privacy.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Children's Privacy</h2>
            <p className="mb-4">
              SimpliDo does not knowingly collect any information from children under 13. 
              Since we don't collect any personal data, this service can be safely used by users of all ages.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Data Backup and Export</h2>
            <p className="mb-4">
              Since your data is stored locally, you are responsible for backing up your tasks if needed. 
              You can manually copy your tasks or use your browser's data export features.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. 
              Your continued use of SimpliDo after any changes constitutes acceptance of the new Privacy Policy.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us through the application interface. 
              Since we don't collect contact information, this is the best way to reach us with privacy-related concerns.
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy;