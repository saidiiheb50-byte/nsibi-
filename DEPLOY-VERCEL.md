# 🚀 Déployer sur Vercel

## Étape 1 : Push vers GitHub

Le code a été poussé vers GitHub. Vérifiez sur : https://github.com/saidiiheb50-byte/nsibi-

## Étape 2 : Déployer le Frontend sur Vercel

### Option A : Via l'Interface Vercel (Recommandé)

1. **Allez sur [vercel.com](https://vercel.com)** et connectez-vous avec GitHub
2. **Cliquez sur "Add New Project"**
3. **Importez votre repository** :
   - Sélectionnez `saidiiheb50-byte/nsibi-`
   - Vercel détectera automatiquement Next.js
4. **Configuration** :
   - Framework Preset: **Next.js** (détecté automatiquement)
   - Root Directory: `./` (racine)
   - Build Command: `npm run build` (par défaut)
   - Output Directory: `.next` (par défaut)
5. **Variables d'environnement** (optionnel) :
   - `NEXT_PUBLIC_API_URL`: URL de votre backend API
6. **Cliquez sur "Deploy"**

### Option B : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

## Étape 3 : Configurer le Backend API

Le backend FastAPI doit être déployé séparément. Options :

### Option 1 : Vercel Serverless Functions

Vercel peut aussi héberger le backend Python avec des fonctions serverless.

### Option 2 : Autres Plateformes (Recommandé pour FastAPI)

- **Railway** : https://railway.app
- **Render** : https://render.com
- **Fly.io** : https://fly.io
- **Heroku** : https://heroku.com

### Configuration Backend sur Railway (Exemple)

1. Créez un compte sur Railway
2. "New Project" → "Deploy from GitHub repo"
3. Sélectionnez votre repo
4. Railway détectera automatiquement Python
5. Configurez :
   - Start Command: `cd backend && python main.py`
   - Port: `8000`

## Étape 4 : Mettre à jour l'URL de l'API

Une fois le backend déployé, mettez à jour `next.config.js` :

```javascript
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://votre-backend-url.com/api/:path*',
      },
    ];
  },
}
```

## 📝 Notes Importantes

- **Frontend** : Vercel est parfait pour Next.js
- **Backend** : FastAPI fonctionne mieux sur Railway/Render/Fly.io
- **Variables d'environnement** : Configurez-les dans les paramètres Vercel
- **Domaine personnalisé** : Vercel offre un domaine gratuit `.vercel.app`

## 🔗 URLs après Déploiement

- **Frontend** : `https://votre-projet.vercel.app`
- **Backend** : `https://votre-backend.railway.app` (ou autre)

## 🐛 Dépannage

### Erreur de Build

Vérifiez les logs dans Vercel Dashboard → Deployments → Logs

### API ne fonctionne pas

Assurez-vous que :
1. Le backend est déployé et accessible
2. CORS est configuré correctement
3. L'URL de l'API est correcte dans `next.config.js`

---

**Votre application sera en ligne en quelques minutes ! 🎉**

