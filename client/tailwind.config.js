module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {}
    },
    variants: {
        animation: ['responsive', 'motion-safe', 'motion-reduce', 'hover']
    },
    plugins: [require('@tailwindcss/typography')]
}
