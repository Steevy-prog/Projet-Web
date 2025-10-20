import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

export function HamburgerMenu({ isOpen, onClose, onNavigate }: HamburgerMenuProps) {
  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Connexion', id: 'connexion' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-l border-yellow-800/20 z-50"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-yellow-600 hover:text-yellow-500 transition-colors"
            >
              <X size={28} />
            </button>

            {/* Menu Items */}
            <div className="flex flex-col items-center justify-center h-full space-y-8 px-8">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className="group relative text-3xl sm:text-4xl tracking-wider text-zinc-300 hover:text-yellow-600 transition-colors duration-300"
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-yellow-600 to-yellow-800"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}

              {/* Decorative Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-12 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-600/20 to-yellow-800/10 blur-3xl"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
