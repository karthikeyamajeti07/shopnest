# Publish ShopNest on Render

## 1. Upload the project to GitHub

Create a new GitHub repository, then run these commands from this folder:

```powershell
git init
git add .
git commit -m "Prepare ShopNest for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your repository URL.

## 2. Create the public service

1. Open https://dashboard.render.com/
2. Choose **New +** and **Blueprint**.
3. Select the GitHub repository.
4. Render detects `render.yaml`.
5. Choose **Apply**.
6. Wait for the build to finish.
7. Open the generated `https://shopnest-xxxx.onrender.com` URL.

The Blueprint uses:

- `npm install --legacy-peer-deps && npm run build` for the build
- `npm start` for production
- `/api/health` as the health check
- A 1 GB persistent disk for `data/auth-data.json` and `data/commerce-data.json`

## Admin login

- Email: `admin@shopnest.in`
- Password: `Admin@123`

Change the admin password before sharing the public site. The current demo admin account is created automatically on the first server start.
