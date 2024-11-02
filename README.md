# Sphience Frontend

### Transforming Research Equipment Access for Academia

![Version](https://img.shields.io/github/package-json/v/deenr/sphience-app)
![Build Status](https://img.shields.io/github/actions/workflow/status/deenr/sphience-app/ci.yml?branch=main)

---

## 🚀 About Sphience

In the academic world, access to research equipment can be a significant barrier to discovery. **Sphience** is on a mission to empower students, PhDs, and professors with streamlined access to essential research resources. Our platform enables seamless collaboration and resource-sharing, transforming the way researchers work together in academia.

**This repository contains the frontend application for Sphience**, built with Angular and designed to provide a responsive, user-friendly interface for academic research and resource sharing.

**Why Sphience?**

- **🤝 Facilitated Collaboration**: Connect students and researchers across universities to access equipment and collaborate on projects.
- **🔧 Simplified Resource Management**: Track and manage equipment with ease, improving research workflows.
- **🎓 Focused on Academia**: Designed specifically for academic environments to enhance the research process.

## 🛠️ Built With

- [Angular](https://angular.io) (v18.2.4) – A powerful framework for building dynamic web applications
- [Angular Material](https://material.angular.io) – UI components for a consistent design
- [SCSS](https://sass-lang.com/) – CSS with enhanced features for modular styling
- [ngx-translate](https://github.com/ngx-translate/core) – For multilingual support
- [ngx-toastr](https://www.npmjs.com/package/ngx-toastr) - For toast notifications
- [JWT Decode](https://www.npmjs.com/package/jwt-decode) - For JWT token handling

## 🚦 Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **Angular CLI**: Install Angular CLI globally
  ```bash
  npm install -g @angular/cli
  ```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/deenr/sphience-app.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd sphience-app
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Run the application:**
   ```bash
   npm start
   ```

The app will be accessible at `http://localhost:4200`. 🎉

## 💻 Development

### Available Scripts

- `npm start` - Start the development server (runs generate-svg-icons script first)
- `npm run build` - Build the app for production (runs generate-svg-icons script first)
- `npm run test` - Run unit tests with Karma
- `npm run watch` - Build and watch for changes

### Project Structure

```plaintext
sphience-app/
├── src/
│   ├── app/
│   │   ├── core/         # Core services, guards, and app-wide components
│   │   ├── modules/      # Feature modules (authenticated, equipment, etc.)
│   │   ├── shared/       # Shared components, directives, and pipes
│   ├── assets/          # Static assets and i18n translations
│   ├── environments/    # Environment configuration files
│   ├── theme/          # SCSS themes, variables, and mixins
```

## 📅 Project Status

> **Status**: 🚧 Ongoing Development

Sphience is actively being developed with a focus on creating a robust platform for academic equipment sharing.

## 🤝 Contributing

Contributions make this open-source project even better! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/new-feature`)
3. **Commit your changes** (`git commit -m 'feat: new feature'`)
4. **Push the branch** (`git push origin feature/new-feature`)
5. **Open a Pull Request**

Please ensure your code follows our style guidelines and includes appropriate tests.

## 📫 Contact

- **X**: [@deanreymen](https://x.com/deanreymen)
- **LinkedIn**: [/in/dean-reymen](https://linkedin.com/in/dean-reymen)

## 🙏 Acknowledgments

Built with gratitude for:

- [Angular](https://angular.io) - The framework that brings our vision to life
- [SCSS](https://sass-lang.com/) - For powerful, modular styling
- [Angular Material](https://material.angular.io) - For a sleek and consistent UI
- The open-source community, for inspiration and support

---

Let’s build a better future for research and academia, one innovation at a time! 🌍📚
