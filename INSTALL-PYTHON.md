# Guide d'Installation de Python sur Windows

## Méthode 1 : Installation depuis python.org (Recommandé)

1. **Télécharger Python**
   - Allez sur [https://www.python.org/downloads/](https://www.python.org/downloads/)
   - Cliquez sur le bouton jaune "Download Python 3.x.x"
   - Le fichier d'installation se téléchargera automatiquement

2. **Installer Python**
   - Double-cliquez sur le fichier téléchargé (`python-3.x.x-amd64.exe`)
   - **IMPORTANT** : Cochez la case **"Add Python to PATH"** en bas de la fenêtre
   - Cliquez sur "Install Now"
   - Attendez la fin de l'installation
   - Cliquez sur "Close"

3. **Vérifier l'installation**
   - Ouvrez un **nouveau** PowerShell (fermez et rouvrez)
   - Tapez : `python --version`
   - Vous devriez voir : `Python 3.x.x`

## Méthode 2 : Installation depuis Microsoft Store

1. Ouvrez le **Microsoft Store**
2. Recherchez "Python 3.11" ou "Python 3.12"
3. Cliquez sur "Installer"
4. Une fois installé, Python sera automatiquement ajouté au PATH

## Méthode 3 : Installation avec winget (Windows 10/11)

Ouvrez PowerShell en tant qu'administrateur et exécutez :

```powershell
winget install Python.Python.3.11
```

## Vérification

Après l'installation, **fermez et rouvrez PowerShell**, puis testez :

```powershell
python --version
python -m pip --version
```

Si les deux commandes fonctionnent, Python est correctement installé !

## Problèmes courants

### "python n'est pas reconnu"

**Solution :** Python n'est pas dans le PATH

1. Réinstallez Python en cochant "Add Python to PATH"
2. Ou ajoutez manuellement Python au PATH :
   - Cherchez "Variables d'environnement" dans Windows
   - Cliquez sur "Variables d'environnement"
   - Dans "Variables système", trouvez "Path" et cliquez "Modifier"
   - Ajoutez : `C:\Users\VotreNom\AppData\Local\Programs\Python\Python3xx`
   - Ajoutez aussi : `C:\Users\VotreNom\AppData\Local\Programs\Python\Python3xx\Scripts`

### "pip n'est pas reconnu"

**Solution :** Utilisez `python -m pip` au lieu de `pip`

```powershell
python -m pip install --upgrade pip
```

## Après l'installation

Une fois Python installé, vous pouvez :

1. Exécuter le script d'installation du backend :
   ```powershell
   .\install-backend.ps1
   ```

2. Ou installer manuellement :
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   python -m pip install -r requirements.txt
   ```

## Besoin d'aide ?

- Documentation officielle : [https://docs.python.org/3/using/windows.html](https://docs.python.org/3/using/windows.html)
- Support Python : [https://www.python.org/about/help/](https://www.python.org/about/help/)



