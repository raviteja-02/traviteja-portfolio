import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[70vh] flex items-center justify-center px-6"
    >
      <div className="text-center space-y-6">
        <Terminal className="size-12 text-primary mx-auto" />
        <div className="font-mono">
          <p className="text-6xl font-bold text-primary glow-text">404</p>
          <p className="text-sm text-muted-foreground mt-2">
            <span className="text-destructive">Error:</span> Page not found
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm border border-border rounded hover:border-primary hover:text-primary transition-all"
        >
          <Home className="size-4" />
          Return Home
        </Link>
      </div>
    </motion.div>
  );
}
