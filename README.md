



  



<p align="center">
  <img  style="width:300px" class="logo" src="https://lh3.googleusercontent.com/d/1if8CdBePaomlqlyxCiNsJTakkU0Vlp3v"/> 
</p>





## PROJECT DESCRIPTION
<p>The Payroll System Frontend is an intuitive and user-friendly interface designed to streamline and simplify payroll management for businesses of all sizes. This robust system ensures accuracy, efficiency, and transparency in handling employee compensation, tax calculations, and compliance with labor </p>

## DOCUMENTATION

- [Documentation](https://docs.google.com/document/d/1XgHxy9Es1DioIiz4VarYvCyFFTxlok6uPjCutHjlKNk/edit)

## PROTOTYPE

- [Prototype](https://figma.com/design/pX61jyDBfJpgGjtqpIGuvR/Payroll-Prototype?node-id=39-1797&t=faLWhV0t3csUkzg3-0)

## INSTALLATION

```
$ npm create vite@latest
```
Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite + Vue project, run:

```
$ cd my-project
$ npm install
$ npm run dev
```


# 👨‍💻Extra

- [Atomic Design Guide 2](https://www.toptal.com/designers/ui/atomic-design-sketch)
- [Atomic Design Guide 1](https://medium.com/@janelle.wg/atomic-design-pattern-how-to-structure-your-react-application-2bb4d9ca5f97)
- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Git Branch Naming Convention](https://phoenixnap.com/kb/git-branch-name-convention)
- [Git Cheat Sheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## KEY FEATURES

<h3>ORGANIZATION MANAGEMENT</h3>



+ Organization
  +  Update Organization
  +  Join Organization
  +  Create Organization
+ Branch
  +  Update Branch 
  +  Create Branch
+ Department
  +  Update Department 
  +  Create Department
+ Pending Request
  + Accepting Members
  + Declining Members
+ Role
  + Set Role
  + Assign Role
+ Members
  + Displaying Member
  + Set Branch && Department 
