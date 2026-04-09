# 🚀 **DEPLOYMENT.md — Chain2025 Deployment Guide**  
### *CoreCraft Genesis • Deterministic Validator Deployment*

This document describes the **complete deployment process** for the Chain2025 ecosystem, covering both the **public Web Portal** and the **private Chain Engine**.  
The deployment model follows strict **separation**, **auditability**, and **validator‑grade determinism**.

---

# 🧩 **1. Deployment Overview**

Chain2025 consists of two independently deployed systems:

### **A) Web Portal (Frontend)**  
Static GitHub Pages site for documentation and visualization.

### **B) Chain Engine (Backend)**  
Private validator‑controlled node running rituals, payouts, and echo operations.

These systems are deployed **separately** and **never interact directly**.

---

# 🌐 **2. Deploying the Web Portal (Frontend)**

The Web Portal is a **static site** hosted on GitHub Pages.

## **2.1 Requirements**
- GitHub account  
- Repository with public visibility  
- GitHub Pages enabled  

## **2.2 Directory Structure**
```
/ (root)
  index.html
  chronik.html
  rituale.html
  fingerprints.html
  module.html
  explorer.html
  styles.css
  scripts.js
  CNAME (optional)
  ARCHITECTURE.md
  SECURITY.md
  DEPLOYMENT.md
```

## **2.3 Deployment Steps**

### **Step 1 — Push files to GitHub**
```
git add .
git commit -m "Deploy Web Portal"
git push
```

### **Step 2 — Enable GitHub Pages**
GitHub → Repository → Settings → Pages:

- **Source:** `main` branch  
- **Folder:** `/root`  
- Save  

### **Step 3 — (Optional) Add custom domain**
Add a `CNAME` file:

```
chain2025.example.com
```

Then configure DNS → CNAME → `username.github.io`.

### **Step 4 — Verify deployment**
Visit:

```
https://username.github.io/repo/
```

or your custom domain.

### **Security Note**
The Web Portal contains **no private keys**, **no RPC**, **no backend logic**.  
It is safe for public hosting.

---

# 🔥 **3. Deploying the Chain Engine (Backend)**

The Chain Engine is **not** deployed to GitHub.  
It runs on **local hardware** or a **private server**.

## **3.1 Requirements**
- Linux or macOS system  
- Besu or Geth installed  
- Python 3  
- Bash  
- Local storage for artifacts  
- Optional: offline USB backup  

## **3.2 Directory Structure**
```
chain-engine/
  genesis/
  bridge/
  payouts/
  chronik/
  agents/
  wallet/
  scripts/
  skeletton/
  rituals/
```

## **3.3 Deployment Steps**

### **Step 1 — Prepare environment**
Install dependencies:

```
sudo apt install python3 git jq
```

Install Besu or Geth:

```
besu --version
```

or

```
geth version
```

### **Step 2 — Initialize Genesis**
```
cd genesis/
./init.sh
```

This creates:

- genesis block  
- validator signatures  
- chain configuration  

### **Step 3 — Start the node**
Besu:

```
besu --config-file=besu-config.toml
```

Geth:

```
geth --datadir data --networkid 2025 --http --http.api eth,net,web3
```

### **Step 4 — Run Ritual Engine**
```
cd rituals/
./run_ritual.sh
```

Executes:

- Genesis  
- Echo  
- Closure  
- Registry updates  
- Chronik binding  

### **Step 5 — Generate audit artifacts**
Artifacts are written to:

```
chronik/
payouts/
skeletton/
```

### **Step 6 — Backup**
Copy the entire engine directory to encrypted storage:

```
rsync -av chain-engine/ /media/usb/backup/
```

---

# 🔗 **4. Updating the Web Portal from the Chain Engine**

Updates are **manual** to preserve security.

### **Step 1 — Export artifacts**
From Chain Engine:

```
chronik/*.json
fingerprints/*.txt
payouts/*.log
```

### **Step 2 — Copy into Web Portal repo**
Place them into:

```
/chronik.html (manual update)
/fingerprints.html (manual update)
```

### **Step 3 — Commit & push**
```
git add .
git commit -m "Update portal with new artifacts"
git push
```

### **Security Rationale**
- No RPC exposure  
- No automated sync  
- No backend leakage  

---

# 🧱 **5. Deployment Separation Model**

| Component | Web Portal | Chain Engine |
|----------|------------|--------------|
| Hosting | GitHub Pages | Local/Server |
| Access | Public | Private |
| Keys | None | Validator keys |
| RPC | None | Local only |
| Updates | Manual | Script‑driven |
| Attack surface | Zero | Controlled |

---

# 🛡️ **6. Security Requirements**

- Chain Engine must never be exposed to the internet  
- No private keys in the Web Portal repo  
- No RPC endpoints in public files  
- All rituals executed locally  
- Backups encrypted and offline  

---

# 📜 **7. Summary**

Deployment of Chain2025 follows a **strict dual‑system model**:

- **Web Portal** → static, public, safe  
- **Chain Engine** → private, operational, validator‑controlled  

This ensures:

- deterministic deployment  
- audit‑grade reproducibility  
- zero attack surface  
- mythic‑technical coherence  

---