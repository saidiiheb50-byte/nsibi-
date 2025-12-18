# 🚀 Déployer sur GitHub (Mode Privé)

## Étape 1 : Préparer le Repository Local

Le repository Git a déjà été initialisé. Vérifiez que tout est prêt :

```powershell
# Vérifier le statut
git status

# Ajouter tous les fichiers
git add .

# Faire le premier commit
git commit -m "Initial commit: TopoAI - AI-Assisted Topographic Mapping Software"
```

## Étape 2 : Créer un Repository Privé sur GitHub

1. **Allez sur GitHub.com** et connectez-vous
2. **Cliquez sur le "+"** en haut à droite → "New repository"
3. **Remplissez les informations :**
   - Repository name: `topo-ai` (ou le nom de votre choix)
   - Description: "AI-Assisted Topographic Mapping Software"
   - **Cochez "Private"** ⚠️ IMPORTANT
   - **Ne cochez PAS** "Initialize with README" (on a déjà un repo)
   - Cliquez sur "Create repository"

## Étape 3 : Connecter le Repository Local à GitHub

GitHub vous donnera des instructions, mais voici les commandes :

```powershell
# Ajouter le remote GitHub (remplacez USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/topo-ai.git

# Renommer la branche principale en 'main' (si nécessaire)
git branch -M main

# Pousser le code vers GitHub
git push -u origin main
```

## Étape 4 : Vérifier

1. Rafraîchissez la page GitHub
2. Vous devriez voir tous vos fichiers
3. Le repository devrait être marqué comme **"Private"** 🔒

## 🔐 Vérifier que le Repository est Privé

1. Allez sur votre repository GitHub
2. Regardez en haut à droite - vous devriez voir un cadenas 🔒 "Private"
3. Seuls vous (et les collaborateurs que vous ajoutez) pouvez y accéder

## 📝 Fichiers Ignorés (Ne seront PAS sur GitHub)

Grâce au `.gitignore`, ces fichiers ne seront **PAS** uploadés :
- `node_modules/` - Dépendances Node.js
- `venv/` - Environnement virtuel Python
- `uploads/`, `processed/`, `exports/` - Fichiers de données
- `.env` - Variables d'environnement (sécurité)
- Fichiers temporaires et logs

## ⚠️ Important - Sécurité

**NE COMMITTEZ JAMAIS :**
- Fichiers `.env` avec des clés API
- Mots de passe ou tokens
- Fichiers de données sensibles (.las, .laz volumineux)
- Clés privées

Le `.gitignore` est déjà configuré pour exclure ces fichiers.

## 🔄 Commandes Git Utiles

```powershell
# Voir les changements
git status

# Ajouter des fichiers
git add .

# Commit
git commit -m "Description des changements"

# Pousser vers GitHub
git push

# Récupérer les changements
git pull
```

## 👥 Ajouter des Collaborateurs (Optionnel)

1. Allez sur votre repository GitHub
2. Cliquez sur "Settings" → "Collaborators"
3. Ajoutez les utilisateurs GitHub par email ou nom d'utilisateur
4. Ils recevront une invitation

## 📚 Documentation GitHub

- [Créer un repository privé](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
- [Git Basics](https://docs.github.com/en/get-started/using-git)

---

**Votre code est maintenant privé et sécurisé sur GitHub ! 🔒**

