# 🧿 **VALIDATOR‑OPERATIONS.md — Chain2025 Validator Operations Guide**  
### *CoreCraft Genesis • Deterministic Validator Protocols*

This document defines the **operational responsibilities**, **ritual procedures**, and **security requirements** for validators participating in the Chain2025 ecosystem.  
It ensures **audit‑grade reproducibility**, **operational safety**, and **mythic‑technical coherence** across all validator actions.

---

# 🧩 **1. Validator Role Overview**

Validators are responsible for:

- executing rituals  
- maintaining the Chain Engine  
- generating and sealing artifacts  
- updating the Chronik  
- ensuring deterministic, reproducible operations  
- safeguarding private keys  
- enforcing the security boundary  

Validators **do not** interact with the Web Portal directly.  
All updates to the portal are **manual exports**.

---

# 🔐 **2. Validator Responsibilities**

### **Core Duties**
- Maintain a secure Chain Engine environment  
- Execute Genesis → Echo → Closure rituals  
- Validate signatures and manifests  
- Produce audit‑sealed artifacts  
- Maintain the Echo Registry  
- Manage payout logic  
- Archive and back up all artifacts  

### **Security Duties**
- Protect validator keys  
- Ensure no RPC endpoints are exposed  
- Keep the Chain Engine offline or firewalled  
- Verify integrity of all manifests  
- Maintain deterministic execution environments  

---

# 🜂 **3. Ritual Execution Procedures**

Validators execute rituals in three phases:

```
GENESIS → ECHO → CLOSURE
```

Each phase must be executed **locally**, using deterministic scripts.

---

## 🜂 3.1 GENESIS Procedure (Creation)

### **Purpose**
Initialize the chain and establish the foundational state.

### **Steps**
1. Load genesis configuration  
2. Verify validator signatures  
3. Initialize chain directory  
4. Seal genesis block  
5. Generate genesis artifacts  
6. Append Chronik entry  

### **Artifacts**
- `genesis.json`  
- `alloc.json`  
- `validators.txt`  
- `genesis-hash.txt`  
- `genesis-proof.log`  

---

## 🜁 3.2 ECHO Procedure (Binding)

### **Purpose**
Bind validator actions, driftpoints, and ritual events.

### **Steps**
1. Load ritual manifest  
2. Validate signatures  
3. Register echo event  
4. Update Echo Registry  
5. Append Chronik entry  
6. Generate driftpoint logs (Skeletton™)  

### **Artifacts**
- `echo-<id>.json`  
- `registry-update.json`  
- `driftpoint-<id>.txt`  
- `echo-proof.log`  

---

## 🜄 3.3 CLOSURE Procedure (Finalization)

### **Purpose**
Finalize the ritual cycle and execute payouts.

### **Steps**
1. Load payout manifest  
2. Validate payout conditions  
3. Execute payout logic  
4. Generate receipts  
5. Seal closure event  
6. Append Chronik entry  

### **Artifacts**
- `closure-<id>.json`  
- `payouts-<id>.log`  
- `receipt-<id>.txt`  
- `closure-proof.log`  

---

# 🧱 **4. Directory Responsibilities**

Validators maintain the following directories:

```
genesis/      # Genesis block, signatures, proofs
chronik/      # Timeline of all events
skeletton/    # Drift rituals, movement logs
payouts/      # Closure events, payout logs
wallet/       # Wallet creation, receipts
rituals/      # Ritual manifests and scripts
agents/       # Validator archetypes and roles
bridge/       # RPC deployment (local only)
scripts/      # CLI routines for rituals
```

Each directory must remain:

- deterministic  
- version‑controlled  
- audit‑sealed  
- free of private keys (except wallet)  

---

# 🔗 **5. Artifact Export to Web Portal**

Validators manually export artifacts to the Web Portal.

### **Allowed**
- Copy JSON logs  
- Copy fingerprints  
- Update HTML pages manually  

### **Not Allowed**
- Automated sync  
- Direct RPC calls  
- Embedding private data  
- Exposing validator keys  

### **Export Procedure**
1. Select artifacts from `chronik/`, `payouts/`, `skeletton/`  
2. Copy into Web Portal repo  
3. Update HTML pages manually  
4. Commit & push  

---

# 🛡️ **6. Security Protocols**

Validators must enforce:

### **Key Security**
- Keys stored only on secured hardware  
- No cloud storage  
- No plaintext backups  
- Signing operations must be local  

### **Environment Security**
- No public RPC  
- No inbound internet connections  
- Firewall‑restricted environment  
- Optional offline mode  

### **Operational Security**
- Scripts must be deterministic  
- No auto‑updating dependencies  
- All manifests must be verified  
- All artifacts must be archived  

---

# 🧬 **7. Validator Lifecycle (ASCII Diagram)**

````text
┌────────────────────┐
│  Validator Machine │
└────────────────────┘
          │
          ▼
┌────────────────────┐
│   GENESIS Ritual   │
└────────────────────┘
          │
          ▼
┌────────────────────┐
│     ECHO Ritual    │
└────────────────────┘
          │
          ▼
┌────────────────────┐
│   CLOSURE Ritual   │
└────────────────────┘
          │
          ▼
┌────────────────────┐
│  Artifact Export   │
│   (Manual Only)    │
└────────────────────┘
          │
          ▼
┌────────────────────┐
│  Web Portal Update │
└────────────────────┘
````

---

# 📜 **8. Summary**

Validators are the **operational core** of Chain2025.  
They ensure:

- deterministic ritual execution  
- secure artifact generation  
- strict separation from the Web Portal  
- protection of validator keys  
- audit‑grade reproducibility  

The validator role is **mythic‑technical**, **operational**, and **foundational** to the Chain2025 ecosystem.

---