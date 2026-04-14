const config = {
    development: {
    API_URL: 'http://localhost:8000/api',
    DEBUG: true,
    },
    production: {
    API_URL: 'https://bmaringonzalez3.ieti.site/api',
    DEBUG: false,
    }
};
    
const env = process.env.NODE_ENV || 'development';
export default config[env];

