import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const ArrowLeftIcon = getIcon('ArrowLeft');

const Terms = () => {
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
        <h1 className="text-3xl font-bold mb-6 gradient-text">Terms and Conditions</h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <div className="prose prose-aqua dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using SimpliDo ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
            <p className="mb-4">
              SimpliDo is a web-based todo list application that allows users to create, manage, and organize their tasks. 
              The service is provided "as is" and we reserve the right to modify or discontinue the service at any time.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not use the service to store illegal, harmful, or offensive content</li>
              <li>Respect the intellectual property rights of others</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Data Storage</h2>
            <p className="mb-4">
              Your tasks and data are stored locally in your browser's storage. We do not collect or store your personal data on our servers. 
              You are responsible for backing up your own data if needed.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Privacy</h2>
            <p className="mb-4">
              Your privacy is important to us. Please review our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, 
              which also governs your use of the Service, to understand our practices.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              The service and its original content, features, and functionality are and will remain the exclusive property of SimpliDo and its licensors. 
              The service is protected by copyright, trademark, and other laws.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
            <p className="mb-4">
              The service is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, 
              express or implied, as to the operation of the service or the information, content, materials, or products included on the service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              To the fullest extent permitted by applicable law, SimpliDo excludes all liability for any loss or damage 
              arising out of or in connection with your use of the service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your access to the service immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, 
              we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">11. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be interpreted and governed in accordance with the laws of your jurisdiction, 
              without regard to its conflict of law provisions.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">12. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms and Conditions, please contact us through the application interface.
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default Terms;