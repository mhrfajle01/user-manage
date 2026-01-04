import { motion } from 'framer-motion';

const AnimatedBackground = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            overflow: 'hidden',
            background: 'var(--background)'
        }}>
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: Math.random() * 400 + 200,
                        height: Math.random() * 400 + 200,
                        borderRadius: '50%',
                        background: i % 2 === 0 ? 'rgba(99, 102, 241, 0.1)' : 'rgba(168, 85, 247, 0.1)',
                        filter: 'blur(80px)',
                    }}
                    animate={{
                        x: [Math.random() * 1000, Math.random() * 1000],
                        y: [Math.random() * 800, Math.random() * 800],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            ))}
        </div>
    );
};

export default AnimatedBackground;
