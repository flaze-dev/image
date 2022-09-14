# image
An image component for the modern web

# environment setup
## packages/react
### install
```bash
# create directory
$ mkdir packages
$ mkdir packages/react
$ cd packages/react/

# install next with tailwindcss
$ yarn create next-app --typescript . 
$ yarn add -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```
### modify
- modify `tailwind.config.js`: add tailwind content paths
- add `/css/global.css`: add tailwind directives
- remove `/public`
- remove `/styles`
- remove `/pages/api`
- remove `/pages/index.tsx`
- modify `/pages/_app.tsx`
