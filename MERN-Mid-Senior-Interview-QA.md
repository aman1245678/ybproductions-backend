# MERN Stack Mid–Senior Interview Guide (100+ Q&A)

**Role focus:** Node.js · Express · TypeScript · MongoDB · Redis · JWT/OAuth/RBAC · gRPC · React · Docker · CI/CD  
**Level:** 2–5 years | Theory + Practical | Hyderabad WFO prep

---

## How to use this guide

- Read **theory** answers aloud once; rewrite in your own words.
- For **practical** questions, type the code yourself (don’t only read).
- Before interview: pick 5 weak areas and drill only those.
- Always end answers with: *trade-offs, edge cases, production impact*.

---

# SECTION 1 — JavaScript & TypeScript Core (COMPLETE)

> Mid–Senior interviews is section pe **output prediction**, **trade-offs**, aur **production bugs** poochte hain. Har answer ko bolke practice karo.

---

### Q1. What is the Event Loop in Node.js? Explain with phases.

**Theory (bolne ka tarika):**  
Node.js ka JS code **ek main thread** pe chalta hai. Blocking I/O se bachne ke liye Node **libuv** use karta hai — async operations (network, file, timers) background me ho sakti hain, aur jab result ready ho, callback/promise **event loop** ke through main thread pe schedule hota hai.

**Architecture (3 parts):**
1. **Call Stack** — abhi chal raha sync JS  
2. **Heap** — objects/memory  
3. **Event Loop + Queues** — async callbacks kab run honge  
4. **libuv Thread Pool** (default 4 threads) — kuch ops yahan: `fs` (kuch), DNS lookup, `crypto.pbkdf2`, `zlib`, etc.  
5. **OS / kernel async** — network sockets mostly non-blocking, thread pool zaroori nahi

**Event loop phases (har “tick”):**

| Phase | Kya chalata hai |
|-------|-----------------|
| **Timers** | `setTimeout` / `setInterval` jinka delay complete ho chuka |
| **Pending callbacks** | kuch system errors (TCP, etc.) ke deferred callbacks |
| **Idle, prepare** | internal only |
| **Poll** | nayi I/O events; I/O callbacks execute; agar kuch nahi aur timers nahi, wait kar sakta hai |
| **Check** | `setImmediate` callbacks |
| **Close callbacks** | `socket.on('close')`, etc. |

**Microtasks (phases ke BEECH me, bahut important):**
- `process.nextTick` queue (sabse pehle drain)
- Promise microtask queue (`.then`, `queueMicrotask`, `async` resume)

Har phase ke baad (aur aksar har callback ke baad) microtasks khali kiye jate hain. Isliye Promise/`nextTick` **macrotask** se pehle chal sakte hain.

**Classic output prediction:**
```js
console.log('A');

setTimeout(() => console.log('B'), 0);
setImmediate(() => console.log('C'));

Promise.resolve().then(() => console.log('D'));
process.nextTick(() => console.log('E'));

console.log('F');
// Sync: A, F
// Microtasks: E then D
// Then timers/check: B aur C order CONTEXT pe depend — I/O callback ke andar setImmediate pehle, warna race
```

**Main thread ke bahar (practical):**
```js
const { pbkdf2 } = require('crypto');
// ye thread pool pe — event loop block NAHI hota (CPU pool busy ho sakta hai)
pbkdf2('pwd', 'salt', 100000, 64, 'sha512', () => console.log('done'));
```

**CPU-heavy sync code event loop KO block karta hai:**
```js
function block(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {} // BAD — saari requests wait
}
```

**Production tips:**
- Long JSON parse / heavy loops → Worker Threads / separate service / queue  
- `UV_THREADPOOL_SIZE` badhao agar bahut saari fs/crypto ops parallel chahiye  
- Event loop lag monitor karo (`perf_hooks.monitorEventLoopDelay`, clinic/doctor)

**Trade-off line (interview closer):**  
“Node I/O concurrency ke liye excellent hai; CPU-bound workloads ke liye main thread protect karna padta hai.”

---

### Q2. Difference between `process.nextTick`, `setImmediate`, `Promise.then`, `setTimeout(0)`?

**Priority order (high → low), roughly:**
1. Current synchronous code  
2. `process.nextTick`  
3. Promise microtasks (`then` / `catch` / `finally` / `await` continuation)  
4. Timers (`setTimeout`/`setInterval`)  
5. I/O callbacks (poll)  
6. `setImmediate` (check phase)  
7. Close callbacks  

| API | Queue | Kab use |
|-----|-------|---------|
| `process.nextTick(fn)` | nextTick queue | “abhi current operation ke baad, phase badalne se pehle” — library internals; **abuse mat karo** |
| `queueMicrotask` / `Promise.then` | microtask | async chaining, natural promise flow |
| `setTimeout(fn, 0)` | timers | minimum delay ~0, lekin exact 0 guarantee nahi (clamped) |
| `setImmediate(fn)` | check | “I/O ke baad / next iteration check phase” — often preferred over `timeout(0)` for “yield to event loop” |

**Starvation example (dangerous):**
```js
function starve() {
  process.nextTick(starve); // I/O kabhi run nahi hogi
}
```

**I/O ke andar order guaranteed-ish:**
```js
const fs = require('fs');
fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
  // usually: immediate → timeout (poll ke baad check pehle aata hai)
});
```

**Practical rule:**
- App code: **Promises / async-await**  
- “Event loop ko yield”: `setImmediate` ya `setTimeout(0)`  
- `nextTick`: sirf jab documentation/library pattern maange; recursive `nextTick` avoid

**Interview trap:**  
“`setTimeout(0)` turant chalta hai” — **galat**. Pehle call stack clear, phir microtasks, phir timers phase.

---

### Q3. Explain `var` vs `let` vs `const`, hoisting, and Temporal Dead Zone (TDZ).

**Comparison table:**

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block `{}` | Block |
| Hoisting | Yes, init `undefined` | Yes, but TDZ | Yes, but TDZ |
| Re-declare same scope | Allowed | Error | Error |
| Re-assign | Yes | Yes | **No** (binding) |
| Object mutate if const | — | — | **Yes** (properties) |

**Hoisting demo:**
```js
console.log(a); // undefined
var a = 1;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 2;
```

**TDZ meaning:**  
`let`/`const` hoist hote hain (memory me jagah), lekin declaration line se pehle access **illegal** hai.

**Block scope practical bug (classic loop + var):**
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3 3 3
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0); // 0 1 2
}
```
`var` ek function-scoped binding share karta hai; `let` har iteration pe naya binding.

**`const` nuance:**
```js
const user = { name: 'Aman' };
user.name = 'Raj'; // OK
user = {}; // TypeError
Object.freeze(user); // shallow immutability
```

**Modern practice:** default `const` → jab reassign chahiye tab `let` → `var` avoid (legacy except rare cases).

**`typeof` undeclared vs TDZ:**
```js
typeof x; // 'undefined' if x never declared (sloppy historical behavior)
typeof y; // ReferenceError if let y in TDZ
let y;
```

---

### Q4. Closures — definition, memory, and real backend use cases.

**Definition:**  
Closure = function + uske **lexical outer scope** ke variables ka permanent link. Outer function return ho chuki ho, tab bhi inner function un values ko yaad rakhti hai.

**Minimal example:**
```js
function makeCounter() {
  let count = 0; // private
  return {
    inc: () => ++count,
    get: () => count,
  };
}
const c = makeCounter();
c.inc(); // 1
c.get(); // 1 — count bahar se directly access nahi
```

**Why useful:**
- Data privacy (module pattern)  
- Function factories (config bake-in)  
- Callbacks that remember context  
- Partial application / currying  

**Backend use cases:**

1) **Express middleware factory**
```js
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user?.roles?.includes(role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}
app.get('/admin', requireRole('admin'), handler);
```

2) **Per-instance rate limiter (single process)**
```js
function createRateLimiter(limit, windowMs) {
  const hits = new Map();
  return (key) => {
    const now = Date.now();
    const bucket = (hits.get(key) || []).filter((t) => now - t < windowMs);
    bucket.push(now);
    hits.set(key, bucket);
    return bucket.length <= limit;
  };
}
```
*(Multi-instance me Redis use karo — in-memory closure scale nahi hota.)*

3) **Memoization**
```js
function memoize(fn) {
  const cache = new Map();
  return (arg) => {
    if (cache.has(arg)) return cache.get(arg);
    const val = fn(arg);
    cache.set(arg, val);
    return val;
  };
}
```

**Memory leak angle (senior touch):**  
Closure bade objects hold kare to GC nahi hoga. Event listeners / timers me stale closures carefully cleanup karo.

**Interview closer:**  
“Closure lexical scope capture karta hai; production me privacy + factories ke liye use karta hoon, lekin retained memory aur multi-process state ke trade-offs jaanta hoon.”

---

### Q5. Promises, `async/await`, combinators, and error handling — complete.

**Promise kya hai?**  
Ek object jo async result represent karta hai. States: `pending` → `fulfilled` | `rejected`. State change **immutable** (settled ke baad change nahi).

**Create:**
```js
const p = new Promise((resolve, reject) => {
  fs.readFile('f.txt', (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});
```

**`async/await`:**  
`async` function hamesha Promise return karti hai. `await` Promise settle hone tak function pause (microtask pe resume).

```ts
async function getUser(id: string) {
  try {
    const user = await userRepo.findById(id);
    if (!user) throw new NotFoundError('User not found');
    return user;
  } catch (err) {
    if (err instanceof NotFoundError) throw err;
    throw new AppError(500, 'Failed to fetch user', { cause: err });
  }
}
```

**Sequential vs parallel (bahut poocha jata hai):**
```ts
// BAD if independent — 2x latency
const user = await getUser(id);
const orders = await getOrders(id);

// GOOD
const [user, orders] = await Promise.all([getUser(id), getOrders(id)]);
```

**Combinators:**

| API | Behavior |
|-----|----------|
| `Promise.all` | Sab success → array; **ek fail → turant reject** (fail-fast) |
| `Promise.allSettled` | Sab settle; `{status, value/reason}[]` — reports/partial UI |
| `Promise.race` | Jo pehle settle (fulfill YA reject) |
| `Promise.any` | Pehla **fulfill**; sab reject → `AggregateError` |

**Timeout pattern with race:**
```ts
function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([p, timeout]);
}
```

**Unhandled rejection:**  
Node me unhandled rejection process ko problematic bana sakti hai. Hamesha `.catch` / `try/catch` around await. Fire-and-forget intentional ho to void + log:
```ts
void sendEmail(user).catch((err) => logger.error({ err }, 'email failed'));
```

**`finally`:** cleanup (loading flags, metrics) — success/fail dono.

**Microtask note:**  
`await` ke baad ka code microtask pe schedule hota hai — isliye sync code pehle khatam hota hai.

**Common bug — async in `forEach`:**
```js
// WRONG — forEach await wait nahi karta
items.forEach(async (i) => await save(i));

// RIGHT
for (const i of items) await save(i);
// OR parallel
await Promise.all(items.map((i) => save(i)));
```

---

### Q6. Shallow copy vs deep copy — methods, pitfalls, production choice.

**Shallow copy:** top-level naya object; **nested objects same reference**.

```js
const a = { user: { name: 'A' }, tags: [1, 2] };
const b = { ...a }; // shallow
b.user.name = 'B';
console.log(a.user.name); // 'B' — SHARED
```

**Shallow methods:** `{...obj}`, `Object.assign({}, obj)`, `arr.slice()`, `[...arr]`

**Deep copy:** nested levels bhi naye.

```js
const deep = structuredClone(a); // modern Node / browsers — recommended
```

**`JSON.parse(JSON.stringify(obj))` limitations:**
- `undefined`, functions, `Symbol` lose  
- `Date` → string  
- `Map`/`Set`/`WeakMap` break  
- `bigint` throw  
- circular reference throw  

**Manual deep clone pitfalls:** recursion + cycles; libraries (`lodash.cloneDeep`) heavy.

**Immutability update pattern (React/Redux style):**
```js
const next = {
  ...state,
  user: { ...state.user, name: 'New' },
};
```

**Production advice:**
- API DTOs clone rarely chahiye — prefer immutable updates  
- Config objects: `structuredClone` ya freeze  
- Mongoose docs: `.toObject()` / `.lean()` samajh ke use (document vs plain)

**Interview closer:**  
“Spread shallow hai; nested mutate shared rahega. Deep clone ke liye `structuredClone`, JSON trick sirf plain data pe.”

---

### Q7. What is TypeScript? Why use it in Node microservices?

**Theory:**  
TypeScript = JavaScript + **static type system**. Compile time pe bugs pakadta hai; runtime pe usually plain JS emit hota hai (types erase).

**Kyun MERN/microservices me:**
1. **API contracts** — DTO/interfaces share across services/packages  
2. **Safer refactors** — rename/field change pe compiler chillata hai  
3. **IDE autocomplete** — productivity  
4. **Self-documentation** — naya engineer signature se flow samajhta hai  
5. **Fewer production type bugs** — `undefined is not a function` kam  

```ts
interface CreateOrderDto {
  userId: string;
  items: { productId: string; qty: number }[];
}

function createOrder(dto: CreateOrderDto) {
  // dto.userID typo → compile error
}
```

**Types erase at runtime — critical point:**
```ts
function isString(x: unknown): x is string {
  return typeof x === 'string'; // runtime check ALAG se chahiye
}
// interface User runtime pe exist nahi karti — Zod/Joi se validate karo
```

**`strict` mode recommend:**  
`tsconfig`: `"strict": true` → `strictNullChecks`, etc. Mid-senior interviews me strict ka mention impress karta hai.

**Trade-offs:**
- Build step / tooling  
- Kabhi-kabhi complex types readability kharab  
- Over-typing se velocity slow  

**Closer:**  
“TS compile-time safety deta hai; runtime validation ab bhi Zod se karni padti hai kyunki types erase ho jati hain.”

---

### Q8. `interface` vs `type` in TypeScript — complete rules.

**Dono shapes describe karte hain.** Practical differences:

| | `interface` | `type` |
|--|-------------|--------|
| Object shape | Excellent | Excellent |
| Extends | `extends` | intersections `&` |
| Union (`A \| B`) | ❌ directly nahi | ✅ |
| Mapped / conditional | Limited | ✅ powerful |
| Declaration merging | ✅ same name merge | ❌ |
| Implements (class) | ✅ natural | possible but interface preferred |
| React props / public API | Often preferred | Also fine |

**Declaration merging (interface superpower):**
```ts
interface Config { port: number }
interface Config { host: string } // merged
const c: Config = { port: 3000, host: 'localhost' };
```
Express me `Request` augment karne ke liye ye useful:
```ts
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; roles: string[] };
    }
  }
}
```

**Unions — type use karo:**
```ts
type Status = 'pending' | 'paid' | 'failed';
type Result<T> = { ok: true; data: T } | { ok: false; error: string };
```

**Extending:**
```ts
interface Animal { name: string }
interface Dog extends Animal { breed: string }

type Cat = Animal & { indoor: boolean };
```

**Team rule (bolo):**  
“Objects/APIs ke liye interface; unions/utility compositions ke liye type; project me consistent raho.”

---

### Q9. Generics — theory + multiple practical examples.

**Theory:**  
Generics = **type variables**. Logic reuse without losing type info (`any` ke bina).

**Basic:**
```ts
function identity<T>(value: T): T {
  return value;
}
identity<string>('hi'); // string
identity(42); // number inferred
```

**Constraints:**
```ts
function getLength<T extends { length: number }>(x: T): number {
  return x.length;
}
getLength('abc'); // ok
getLength(10); // error
```

**Repo helper (backend):**
```ts
async function findById<T>(
  model: { findById(id: string): Promise<T | null> },
  id: string
): Promise<T> {
  const doc = await model.findById(id);
  if (!doc) throw new Error('Not found');
  return doc;
}
```

**API response wrapper:**
```ts
type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  message: string;
};
```

**`keyof` + generics (type-safe pick):**
```ts
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const k of keys) out[k] = obj[k];
  return out;
}
```

**Default type param:**
```ts
type Page<T = unknown> = { items: T[]; total: number };
```

**Interview tip:**  
Generics tab dikhao jab DRY + safety dono chahiye; over-abstract mat karo.

---

### Q10. `any` vs `unknown` vs `never` vs `void` — complete.

| Type | Meaning | Safe? |
|------|---------|-------|
| `any` | Type checking OFF | ❌ escape hatch |
| `unknown` | “Kuch bhi, pehle narrow karo” | ✅ for external data |
| `void` | Function meaningful value return nahi karti | callbacks |
| `never` | Kabhi value exist nahi / unreachable | exhaustive checks |

**`unknown` workflow:**
```ts
function parseJson(raw: string): unknown {
  return JSON.parse(raw);
}

const data = parseJson(body);
if (typeof data === 'object' && data !== null && 'id' in data) {
  const id = (data as { id: unknown }).id;
  if (typeof id === 'string') {
    // safe use
  }
}
```

Better: Zod
```ts
const UserSchema = z.object({ id: z.string(), email: z.string().email() });
const user = UserSchema.parse(JSON.parse(raw)); // typed + runtime safe
```

**`never` exhaustive switch (senior-level):**
```ts
type Shape = { kind: 'circle'; r: number } | { kind: 'square'; s: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.r ** 2;
    case 'square': return shape.s ** 2;
    default: {
      const _exhaustive: never = shape;
      return _exhaustive;
    }
  }
}
```

**`void` vs `undefined`:**  
`void` means caller ignore kare return value — React `onClick` handlers me common.

**Rule:**  
External boundaries (`req.body`, `JSON.parse`, 3rd-party) → `unknown` + validate. `any` sirf temporary migration me, ticket ke saath.

---

### Q11. Structural typing / duck typing in TypeScript.

**Theory:**  
TypeScript **nominal** nahi (jaise Java class names), **structural** hai — agar shape match karti hai, assignable hai (“duck typing”: *agar ye walk/quack karta hai…*).

```ts
interface Point { x: number; y: number }

const p = { x: 1, y: 2, z: 3 };
const q: Point = p; // OK — extra `z` allowed when assigning FROM a variable (freshness rules differ for object literals)
```

**Freshness / excess property check (object literal):**
```ts
const q2: Point = { x: 1, y: 2, z: 3 }; // Error — excess property on fresh literal
```

**Practical impact:**
- Alag-alag interfaces same fields se compatible ho sakti hain unexpectedly  
- Branded/nominal types chahiye ho (UserId vs OrderId) to techniques:

```ts
type UserId = string & { readonly __brand: 'UserId' };
function UserId(id: string) { return id as UserId; }
```

**Class vs interface structural:**
```ts
class A { x = 1 }
class B { x = 1 }
const a: A = new B(); // OK structurally
```

**Closer:**  
“TS shape check karta hai, name nahi — isliye DTOs compatible lag sakte hain; critical IDs pe branding/validation use karta hoon.”

---

### Q12. Practical: Typed Express request + auth user (complete pattern).

**Goal:** `req.user` type-safe, middleware chain clear, handlers clean.

**Approach A — module augmentation (recommended):**
```ts
// types/express.d.ts
import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      roles: Array<'admin' | 'user' | 'editor'>;
    };
  }
}
```

**Middleware:**
```ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload { sub: string; roles: Array<'admin' | 'user' | 'editor'> }

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { id: payload.sub, roles: payload.roles };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRole(...roles: Array<'admin' | 'user' | 'editor'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const ok = roles.some((r) => req.user!.roles.includes(r));
    if (!ok) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}
```

**Handler:**
```ts
export async function getMe(req: Request, res: Response) {
  // req.user optional — is route pe requireAuth pehle laga hona chahiye
  res.json({ user: req.user });
}

router.get('/me', requireAuth, getMe);
router.get('/admin', requireAuth, requireRole('admin'), adminHandler);
```

**Approach B — generic AuthedRequest (alternate):**
```ts
interface AuthUser { id: string; role: 'admin' | 'user' }
interface AuthedRequest extends Request { user: AuthUser } // required after auth

function requireAuth(req: Request, res: Response, next: NextFunction) {
  // ... set user then:
  next();
}
```

**Async handler wrapper (bonus practical — interviews me points):**
```ts
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.get('/me', requireAuth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user!.id);
  res.json(user);
}));
```

---

## SECTION 1 EXTRA — Jo almost har mid–senior round me aa jata hai

### Q1-X1. `==` vs `===`? Why avoid loose equality?

`===` type + value. `==` coercion karta hai (`0 == false`, `'' == 0`, `null == undefined`).

```js
0 == false; // true
0 === false; // false
null == undefined; // true
null === undefined; // false
```
**Rule:** hamesha `===`. Sirf `null` check me kabhi `== null` (null + undefined dono) intentionally.

---

### Q1-X2. `null` vs `undefined`?

| | `undefined` | `null` |
|--|-------------|--------|
| Meaning | value assign nahi hui / missing | intentional empty |
| typeof | `'undefined'` | `'object'` (historical bug) |
| Default params | trigger | trigger nahi for null in some cases |

API design: “not provided” → omit field / undefined; “cleared” → `null`.

---

### Q1-X3. `this` binding — default, implicit, explicit, arrow.

```js
const obj = {
  name: 'YB',
  regular() { return this.name; },
  arrow: () => this.name, // lexical this (outer)
};

obj.regular(); // 'YB'
const fn = obj.regular;
fn(); // undefined (strict) — lost receiver

obj.regular.call({ name: 'X' }); // 'X'
obj.regular.apply({ name: 'Y' });
const bound = obj.regular.bind({ name: 'Z' });
bound(); // 'Z'
```

**Arrow functions:** own `this` nahi — surrounding lexical `this`. Callbacks me useful; object methods me aksar galat.

---

### Q1-X4. `call` vs `apply` vs `bind`?

- `call(thisArg, a, b)` — args list  
- `apply(thisArg, [a, b])` — args array  
- `bind(thisArg, ...partial)` — **new function** with fixed `this` (aur partial args)

---

### Q1-X5. Prototypes vs ES6 classes?

JS inheritance prototype chain pe based hai. `class` syntax sugar + nicer semantics (`new`, `super`, non-enumerable methods).

```js
class Animal {
  constructor(public name: string) {}
  speak() { return `${this.name}`; }
}
class Dog extends Animal {
  speak() { return `${super.speak()} barks`; }
}
```

`__proto__` vs `Object.getPrototypeOf` — interviews me modern API prefer.

---

### Q1-X6. EventEmitter — kab use?

Node core pattern for pub/sub inside process:

```js
import { EventEmitter } from 'events';
const bus = new EventEmitter();
bus.on('order.paid', (order) => console.log(order.id));
bus.emit('order.paid', { id: '1' });
```

**Pitfalls:** memory leaks (`on` without `off`), `MaxListenersExceededWarning`, errors in listeners. Cross-service ke liye Redis/Kafka.

---

### Q1-X7. Rest / spread / destructuring?

```js
const { id, ...rest } = user;
const arr = [1, 2, 3];
const [first, ...tail] = arr;
Math.max(...arr);
function f(a, ...others) {}
```

---

### Q1-X8. Optional chaining & nullish coalescing?

```js
user?.address?.city;
value ?? 'default'; // sirf null/undefined pe default
value || 'default'; // 0, '', false bhi default — aksar galat
```

---

### Q1-X9. Map / Set / WeakMap — kab array/object ki jagah?

| Structure | Use |
|-----------|-----|
| `Map` | keys any type, frequent add/delete, size |
| `Set` | unique values, membership |
| `WeakMap` | object keys, GC-friendly metadata (private data) |
| `WeakSet` | object membership without preventing GC |

```js
const cache = new WeakMap<object, string>();
```

---

### Q1-X10. Pure function / side effects / immutability?

Pure: same input → same output; no external mutate. Testable, cacheable, predictable. Reducers/pricing calculators pure rakho; DB/IO edges pe side effects.

---

### Q1-X11. Currying / partial application?

```js
const add = (a: number) => (b: number) => a + b;
const add5 = add(5);
add5(3); // 8
```
Useful with `map`/`compose`; overuse readability kharab karta hai.

---

### Q1-X12. Debounce vs throttle (implement conceptually)?

- **Debounce:** wait until quiet for `ms` (search box)  
- **Throttle:** at most once per `ms` (scroll handler)

*(Full code Section 13 me; yahan concept clear rakho.)*

---

### Q1-X13. Modules: CommonJS vs ESM?

```js
// CJS
const x = require('./x');
module.exports = { x };

// ESM
import x from './x.js';
export function y() {}
```

ESM: static analysis, top-level await (contexts), browser align. CJS: legacy Node ecosystem. `"type": "module"` / dual packages complexity jaanna senior plus hai.

---

### Q1-X14. TypeScript utility types you must know?

```ts
Partial<T>      // all optional
Required<T>     // all required
Readonly<T>
Pick<T, 'a' | 'b'>
Omit<T, 'a'>
Record<K, V>
Exclude<T, U>
Extract<T, U>
NonNullable<T>
ReturnType<typeof fn>
Parameters<typeof fn>
Awaited<Promise<T>>
```

**Example:**
```ts
type UpdateUser = Partial<Pick<User, 'name' | 'email'>>;
```

---

### Q1-X15. Type narrowing techniques?

```ts
typeof x === 'string'
x instanceof Date
Array.isArray(x)
'prop' in obj
discriminated unions (kind tag)
custom type guards: (x): x is Foo => ...
assertion functions: assert(x): asserts x is string
```

---

### Q1-X16. `readonly` vs `as const`?

```ts
const dirs = ['up', 'down'] as const;
// type: readonly ['up', 'down']
type Dir = typeof dirs[number]; // 'up' | 'down'
```

---

### Q1-X17. Enums — use or avoid?

```ts
enum Role { Admin = 'admin', User = 'user' }
```
Runtime object emit hota hai. Bahut teams prefer:
```ts
const Role = { Admin: 'admin', User: 'user' } as const;
type Role = typeof Role[keyof typeof Role];
```
Numeric enums reverse mapping quirks — interview me mention karo.

---

### Q1-X18. Generators / iterators (basic awareness)?

```js
function* ids() {
  let i = 0;
  while (true) yield i++;
}
const gen = ids();
gen.next().value; // 0
```
Lazy sequences; async generators streams me. Must-know depth kam, awareness plus.

---

### Q1-X19. Memory leaks common in Node/JS?

- Global caches without TTL/max size  
- Closures retaining large buffers  
- EventEmitter listeners not removed  
- Uncleared `setInterval`  
- Detached DOM (frontend)  

Fix: bounds, WeakMap, cleanup, heap snapshots.

---

### Q1-X20. Predict the output (combo drill)?

```js
async function run() {
  console.log(1);
  await Promise.resolve();
  console.log(2);
}
console.log(3);
run();
console.log(4);
// 3, 1, 4, 2
```

```js
setTimeout(() => console.log('T'), 0);
Promise.resolve().then(() => console.log('P'));
console.log('S');
// S, P, T
```

In interviews aise 2–3 drills confidently solve karo.

---

## Section 1 — 60 second revision sheet

1. Event loop phases + microtasks (`nextTick` > Promise > timers/`setImmediate`)  
2. Thread pool exists; sync CPU blocks loop  
3. `const` default; TDZ; loop+`var` bug  
4. Closures = lexical capture; factories + memory caution  
5. `Promise.all` vs `allSettled`; never async `forEach`  
6. Spread = shallow; `structuredClone` = deep  
7. TS types erase → runtime Zod still needed  
8. `interface` merge / `type` unions  
9. Generics for reusable safe helpers  
10. Prefer `unknown` over `any`  
11. Structural typing + excess property checks  
12. Express `Request` augmentation + `requireAuth`/`requireRole`  
13. `===`, `this`/arrows, `??` vs `||`, Map/Set  
14. Utility types: `Partial`, `Pick`, `Omit`, `Record`  
15. Always end with trade-off / production note  

---

# SECTION 2 — Node.js & Express Deep Dive (Q13–Q28)

### Q13. Why is Node.js good for I/O-heavy APIs but not CPU-heavy work?

Event-driven non-blocking I/O handles many concurrent connections well. CPU-bound work blocks the single JS thread → latency spikes. Offload CPU work to worker threads, separate services, or queues.

---

### Q14. Explain middleware in Express. Order matters — how?

Middleware is `(req, res, next) => void`. Order of `app.use` defines pipeline.

Typical order:
1. request logging / correlation id  
2. body parsers  
3. auth  
4. route handlers  
5. 404 handler  
6. centralized error handler (4-arg)

```ts
app.use(express.json());
app.use(attachRequestId);
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);
```

---

### Q15. How do you design a centralized error handler?

```ts
class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
  }
}

function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  const status = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal Server Error';
  if (status >= 500) console.error(err);
  res.status(status).json({ success: false, message });
}
```

Never leak stack traces in production responses.

---

### Q16. REST principles — resource naming, status codes, idempotency.

- Resources as nouns: `/users`, `/orders/123`  
- Verbs via HTTP methods  
- Common codes: `200/201/204`, `400/401/403/404/409/422`, `500/502/503`  
- **Idempotent:** GET, PUT, DELETE (safe retries)  
- **Not idempotent:** POST (usually)

---

### Q17. PUT vs PATCH vs POST?

- **POST:** create (or trigger action) — new resource  
- **PUT:** full replace of resource (idempotent)  
- **PATCH:** partial update  

---

### Q18. How do you version APIs?

Common approaches:
- URL: `/api/v1/users` (most common, explicit)  
- Header: `Accept: application/vnd.company.v1+json`  
- Query: `?version=1` (less preferred)

Also plan deprecation windows and backward-compatible additive changes.

---

### Q19. What is CORS and how do you configure it securely?

CORS is browser-enforced cross-origin access control.

```ts
import cors from 'cors';
app.use(cors({
  origin: ['https://app.example.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));
```

Avoid `origin: '*'` with credentials. Validate Origin allowlist.

---

### Q20. Rate limiting — why and how (Express + Redis)?

Protects against abuse / DDoS-ish traffic / brute force.

```ts
// conceptual sliding window with Redis INCR + EXPIRE
const key = `rl:${ip}:${route}`;
const count = await redis.incr(key);
if (count === 1) await redis.expire(key, 60);
if (count > 100) throw new AppError(429, 'Too many requests');
```

Also use token buckets for smoother limits.

---

### Q21. What is Helmet? Security headers you should know?

Helmet sets security HTTP headers: CSP, X-Frame-Options, HSTS, X-Content-Type-Options, etc.

Also: sanitize inputs, validate payloads, disable `x-powered-by`, use HTTPS, parameterize DB queries.

---

### Q22. Streaming vs buffering responses — when?

- Buffer: small JSON APIs  
- Stream: large file downloads, CSV export, video, proxying upstream  

```ts
res.setHeader('Content-Type', 'text/csv');
stream.pipe(res);
```

Prevents memory blowups.

---

### Q23. Cluster mode / PM2 / multiple instances — how does load sharing work?

One Node process uses one CPU core for JS. Scale horizontally:
- Node `cluster` module  
- PM2 cluster mode  
- Multiple containers behind a load balancer  

Sticky sessions needed if in-memory session store (prefer Redis sessions).

---

### Q24. Environment config best practices?

- Never commit secrets  
- Use `.env` locally + secret manager in prod (AWS Secrets Manager / Parameter Store)  
- Validate env at boot with Zod  

```ts
const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(32),
});
export const env = envSchema.parse(process.env);
```

Fail fast if config invalid.

---

### Q25. Graceful shutdown — why important?

On deploy/restart, finish in-flight requests, close DB/Redis, stop accepting new connections.

```ts
process.on('SIGTERM', async () => {
  server.close();
  await mongoose.connection.close();
  await redis.quit();
  process.exit(0);
});
```

---

### Q26. Difference between `require` and `import`? ESM in Node?

- CommonJS: `require` / `module.exports` (sync)  
- ESM: `import` / `export` (static analysis friendly)  

Modern Node: `"type": "module"` or `.mjs`. Mixed interop exists but prefer one style.

---

### Q27. Practical: Design folder structure for a scalable Express + TS API.

```
src/
  app.ts
  server.ts
  config/
  modules/
    users/
      user.controller.ts
      user.service.ts
      user.repo.ts
      user.routes.ts
      user.schema.ts
      user.types.ts
  middlewares/
  utils/
  errors/
```

Feature/module based > random MVC dump for mid-size apps.

---

### Q28. Practical: Write pagination + sorting middleware/query helper.

```ts
function parseListQuery(q: any) {
  const page = Math.max(1, Number(q.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(q.limit) || 20));
  const sort = (q.sort as string) || '-createdAt';
  const skip = (page - 1) * limit;
  return { page, limit, skip, sort };
}
```

Always cap `limit` to protect DB.

---

# SECTION 3 — MongoDB & Mongoose (Q29–Q45)

### Q29. Document model vs relational model — when Mongo fits?

Mongo fits flexible schemas, nested documents, horizontal scale, fast iteration. Relational fits strong joins, complex transactions historically (Mongo now has multi-doc transactions too).

Use Mongo when access patterns are document-centric (user profile, product catalog with embedded variants).

---

### Q30. Embedding vs referencing — how do you decide?

**Embed when:**
- data always read together  
- bounded size  
- not heavily shared  

**Reference when:**
- large / unbounded arrays  
- shared across many docs  
- need independent lifecycle  

Example: order embeds line items; user referenced by `userId`.

---

### Q31. Explain indexes. Types you use in production?

Indexes speed reads, slow writes slightly, use memory/disk.

Types:
- Single field  
- Compound  
- Multikey (arrays)  
- Text  
- TTL  
- Unique  
- Partial / sparse  

**Compound index rule (ESR):** Equality → Sort → Range.

```js
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 })
```

---

### Q32. What is the covered query / IXSCAN vs COLLSCAN?

- `COLLSCAN`: full collection scan (bad for large collections)  
- `IXSCAN`: uses index  
- Covered query: answered entirely from index (no doc fetch)  

Use `explain('executionStats')` in interviews/demo.

---

### Q33. Aggregation pipeline — stages you must know?

`$match` → `$project` → `$group` → `$sort` → `$limit` → `$lookup` → `$unwind` → `$addFields` → `$facet`

**Tip:** `$match` early to reduce documents.

```js
Order.aggregate([
  { $match: { status: 'paid' } },
  { $group: { _id: '$userId', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
  { $limit: 10 },
]);
```

---

### Q34. `$lookup` vs application-level join?

`$lookup` is server-side join (like left join). App-level: two queries + map in code. Prefer app-level for simple cases / caching; `$lookup` for reporting pipelines.

Beware `$lookup` on huge collections without indexes.

---

### Q35. Mongoose middleware (hooks) — pre/post save examples?

```ts
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});
```

Also: `pre('findOneAndUpdate')` gotchas — `this` is query, not document.

---

### Q36. Validation: Mongoose vs Joi/Zod — who validates what?

- **Zod/Joi:** validate HTTP input at boundary (fail fast, clear 400s)  
- **Mongoose:** last-line schema integrity at persistence  

Validate twice in serious systems (edge + DB).

---

### Q37. Transactions in MongoDB — when needed?

Multi-document ACID via sessions (replica set / mongos required).

```ts
const session = await mongoose.startSession();
session.startTransaction();
try {
  await Account.updateOne({ _id: from }, { $inc: { bal: -amt } }, { session });
  await Account.updateOne({ _id: to }, { $inc: { bal: amt } }, { session });
  await session.commitTransaction();
} catch (e) {
  await session.abortTransaction();
  throw e;
} finally {
  session.endSession();
}
```

Use for money transfers, inventory decrement + order create, etc.

---

### Q38. Optimistic concurrency / versioning?

Use `__v` or custom `version` field; update only if version matches.

```ts
const res = await Doc.updateOne(
  { _id, version: expected },
  { $set: { ...fields }, $inc: { version: 1 } }
);
if (res.modifiedCount === 0) throw new ConflictError();
```

---

### Q39. TTL indexes — use cases?

Auto-delete expired docs: OTP, sessions, refresh tokens, temp uploads metadata.

```js
db.otps.createIndex({ createdAt: 1 }, { expireAfterSeconds: 300 })
```

---

### Q40. Soft delete patterns?

`deletedAt: Date | null` + default query middleware excluding deleted. Pros: recoverability. Cons: every query must filter; unique indexes need partial filters.

---

### Q41. Schema design for a social feed / notifications — high level?

Often:
- write fan-out to per-user timelines for read-heavy feeds  
- or fan-in pull model for write-heavy  
- notifications: separate collection with indexes `{ userId: 1, createdAt: -1 }`, unread count in Redis

Discuss trade-offs; no single perfect design.

---

### Q42. How do you avoid the MongoDB unbounded array problem?

Never push infinitely into one doc (e.g. chat messages in one array). Cap with buckets, or separate collection with references.

---

### Q43. Practical: Write a Mongoose schema for User with RBAC roles.

```ts
const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  roles: { type: [String], enum: ['user', 'admin', 'editor'], default: ['user'] },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });
```

---

### Q44. Practical: Aggregation — monthly revenue report.

```js
[
  { $match: { status: 'paid', createdAt: { $gte: start, $lte: end } } },
  {
    $group: {
      _id: { y: { $year: '$createdAt' }, m: { $month: '$createdAt' } },
      revenue: { $sum: '$amount' },
      orders: { $sum: 1 },
    },
  },
  { $sort: { '_id.y': 1, '_id.m': 1 } },
]
```

---

### Q45. How do you migrate schemas in production without downtime?

1. Expand: deploy code that reads old+new fields  
2. Backfill data  
3. Switch writes to new shape  
4. Contract: remove old fields later  

Never break old clients in one shot.

---

# SECTION 4 — Auth, JWT, OAuth 2.0, RBAC, Sessions (Q46–Q58)

### Q46. Authentication vs Authorization?

- **Authentication:** who are you?  
- **Authorization:** what can you do?

JWT proves identity; RBAC decides permissions.

---

### Q47. How does JWT work end-to-end?

1. User logs in with credentials  
2. Server verifies → signs JWT (`header.payload.signature`) with secret/private key  
3. Client stores token (prefer httpOnly cookie or careful memory)  
4. Client sends `Authorization: Bearer <token>`  
5. Server verifies signature + expiry + claims  

**Claims:** `sub`, `iat`, `exp`, `role`, custom.

---

### Q48. Access token vs refresh token strategy?

- **Access token:** short-lived (5–15 min), used on APIs  
- **Refresh token:** long-lived, stored securely (httpOnly cookie / DB hashed), used only to mint new access tokens  

On logout/compromise: revoke refresh token in DB/Redis denylist.

```ts
// refresh rotation
const old = await findRefresh(token);
if (!old || old.revoked) throw unauthorized;
await revoke(old);
const next = await issueRefresh(userId);
```

Rotation detects reuse (theft).

---

### Q49. Where should JWTs be stored on frontend?

| Storage | XSS risk | CSRF risk | Notes |
|---------|----------|-----------|-------|
| localStorage | High | Low | Avoid for access tokens if possible |
| memory | Low | Low | Lost on refresh |
| httpOnly Secure cookie | Lower XSS | CSRF concern | Use SameSite + CSRF token |

Production SPA often: short access in memory + refresh in httpOnly cookie.

---

### Q50. OAuth 2.0 — explain Authorization Code + PKCE.

Used for “Login with Google/GitHub”:
1. App redirects user to IdP authorize URL (with `code_challenge` for PKCE)  
2. User consents  
3. IdP redirects with `authorization_code`  
4. Backend exchanges code + `code_verifier` for tokens  

Never use Implicit flow for new apps. Backend should hold client secret when confidential client.

---

### Q51. RBAC vs ABAC?

- **RBAC:** roles → permissions (`admin`, `editor`)  
- **ABAC:** attributes/policies (`department=finance AND amount<10000`)  

Many products start RBAC, add ABAC for complex orgs.

```ts
function requirePermission(...perms: string[]) {
  return (req, res, next) => {
    const userPerms = expandRolePermissions(req.user.roles);
    if (!perms.every(p => userPerms.includes(p))) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}
```

---

### Q52. Session-based auth vs JWT — trade-offs?

| | Sessions | JWT |
|--|----------|-----|
| State | Server store (Redis) | Mostly stateless |
| Revocation | Easy (delete session) | Harder (need denylist / short TTL) |
| Scale | Needs shared store | Easy horizontal scale |
| Size | Cookie session id small | JWT can get large |

Hybrid common: JWT access + server-side refresh sessions.

---

### Q53. Password hashing — bcrypt/argon2 best practices?

- Never store plaintext or reversible encryption for passwords  
- Prefer **argon2id** or bcrypt with proper cost factor  
- Salt is built-in  
- Constant-time compare for tokens  

```ts
const hash = await bcrypt.hash(password, 12);
const ok = await bcrypt.compare(password, hash);
```

---

### Q54. Common auth vulnerabilities & mitigations?

- Brute force → rate limit + lockout/CAPTCHA  
- Credential stuffing → MFA  
- XSS token theft → httpOnly cookies, CSP  
- CSRF → SameSite, CSRF tokens  
- JWT none alg / weak secret → strict verify, strong secrets  
- Open redirects in OAuth → allowlist redirect URIs  

---

### Q55. Practical: Implement login + refresh endpoints (sketch).

```ts
POST /auth/login
  validate body (Zod)
  find user, compare password
  create accessToken (15m)
  create refreshToken (7d), store hash in DB
  set refresh cookie httpOnly
  return { accessToken, user }

POST /auth/refresh
  read refresh cookie
  verify + check DB not revoked
  rotate refresh
  return new accessToken

POST /auth/logout
  revoke refresh
  clear cookie
```

---

### Q56. What is MFA / TOTP at high level?

Second factor: time-based OTP (Google Authenticator), SMS (weaker), WebAuthn. Store encrypted secrets; verify window ±1 step.

---

### Q57. Service-to-service auth?

- mTLS  
- short-lived service JWTs signed by internal issuer  
- API keys (less ideal)  
- cloud IAM roles  

Never reuse end-user JWTs blindly across trust boundaries without audience checks (`aud` claim).

---

### Q58. Practical interview question: “How do you invalidate JWTs on password change?”

Options:
1. Version claim `tokenVersion` on user; bump on password change; reject mismatched  
2. Short access TTL + refresh revoke  
3. Redis denylist of `jti` until expiry  

Best combo: bump tokenVersion + revoke all refresh tokens.

---

# SECTION 5 — Redis, Caching, Pub/Sub (Q59–Q68)

### Q59. Why Redis? What problems does it solve?

In-memory data store: caching, sessions, rate limits, locks, queues, pub/sub, leaderboards. Extremely fast vs DB round-trips.

---

### Q60. Cache patterns: cache-aside, write-through, write-behind?

- **Cache-aside (lazy):** app reads cache → miss → DB → set cache  
- **Write-through:** write DB + cache together  
- **Write-behind:** write cache, async flush DB (complex, risk of loss)  

Most APIs use cache-aside.

```ts
async function getProduct(id: string) {
  const key = `product:${id}`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  const product = await Product.findById(id).lean();
  if (product) await redis.setEx(key, 300, JSON.stringify(product));
  return product;
}
```

---

### Q61. Cache invalidation strategies?

Hardest problem in CS (half-joke, half-true).

Strategies:
- TTL expiry  
- Explicit delete on update/delete  
- Versioned keys `product:v2:id`  
- Tag-based invalidation  

On update:
```ts
await Product.updateOne(...)
await redis.del(`product:${id}`);
```

---

### Q62. Redis data structures you should know?

- **String:** cache blobs, counters  
- **Hash:** object fields  
- **List:** queues, recent activity  
- **Set:** unique tags, online users  
- **Sorted Set:** leaderboards, delayed jobs scores  
- **Stream:** event logs (approx Kafka-lite)  
- **Bitmap / HyperLogLog:** analytics approximations  

---

### Q63. Distributed lock with Redis — pitfalls?

```ts
const ok = await redis.set(`lock:order:${id}`, token, { NX: true, EX: 10 });
```

Must set expiry; release only if token matches (Lua script). Redlock is debated — understand fencing tokens for correctness-critical systems.

---

### Q64. Redis pub/sub use cases & limitations?

Good for: cache bust notifications, websocket fan-out within cluster, realtime signals.  
Not durable: if subscriber offline, message lost. For durability use Streams / Kafka / RabbitMQ.

---

### Q65. Session storage in Redis?

Store `sessionId → user data` with TTL. Sticky sessions unnecessary. Scale horizontally easily.

---

### Q66. Stampede / thundering herd — how to prevent?

When popular key expires, many requests hit DB.

Mitigations:
- mutex lock around rebuild  
- probabilistic early refresh  
- staggered TTLs  
- serve stale while revalidate  

---

### Q67. Practical: Rate limit + login attempt counter.

```ts
const key = `login:fail:${email}`;
const fails = await redis.incr(key);
if (fails === 1) await redis.expire(key, 900);
if (fails > 5) throw new AppError(429, 'Account temporarily locked');
// on success:
await redis.del(key);
```

---

### Q68. Redis vs Memcached?

Redis: richer data structures, persistence options, pub/sub, Lua. Memcached: simple KV, multithreaded historically. Most Node stacks choose Redis.

---

# SECTION 6 — Validation (Joi / Zod) (Q69–Q72)

### Q69. Why validate at the boundary?

Never trust client input. Validation prevents injection-ish payloads, type confusion, oversized bodies, missing fields.

---

### Q70. Zod vs Joi — comparison for interviews?

- **Zod:** TS-first, infer types `z.infer<typeof schema>`, great DX  
- **Joi:** mature, rich ecosystem, historically common in Express  

```ts
const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
  age: z.number().int().min(18).optional(),
});
type CreateUserDto = z.infer<typeof createUserSchema>;
```

---

### Q71. Practical: validation middleware factory.

```ts
export const validate =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }
    Object.assign(req, parsed.data);
    next();
  };
```

---

### Q72. Sanitize vs validate?

Validate = schema correctness. Sanitize = clean dangerous content (HTML strip for XSS). Both needed for user-generated content.

---

# SECTION 7 — gRPC & Protocol Buffers (Q73–Q80)

### Q73. What is gRPC? Why use it between microservices?

gRPC is RPC framework over HTTP/2 using Protocol Buffers (binary). Pros: strongly typed contracts, efficient payload, streaming, codegen clients/servers. Great for **internal** service-to-service calls. REST/JSON often kept for public/browser APIs.

---

### Q74. Protobuf vs JSON?

| | Protobuf | JSON |
|--|----------|------|
| Size | Compact binary | Larger text |
| Schema | Required `.proto` | Optional |
| Browser | Harder | Native |
| Versioning | Field numbers | Field names |

---

### Q75. Explain `.proto` basics.

```protobuf
syntax = "proto3";
package user.v1;

message GetUserRequest { string id = 1; }
message User {
  string id = 1;
  string email = 2;
  string name = 3;
}
service UserService {
  rpc GetUser (GetUserRequest) returns (User);
}
```

Field numbers are identity — never reuse numbers casually.

---

### Q76. gRPC streaming types?

1. Unary  
2. Server streaming  
3. Client streaming  
4. Bidirectional streaming  

Use cases: live logs, file upload chunks, chat-like streams.

---

### Q77. Error handling in gRPC?

Uses rich status codes: `OK`, `INVALID_ARGUMENT`, `NOT_FOUND`, `ALREADY_EXISTS`, `PERMISSION_DENIED`, `UNAVAILABLE`, `DEADLINE_EXCEEDED`, etc. Map domain errors carefully.

---

### Q78. Deadlines / timeouts / retries?

Always set deadlines on client calls. Retries only for idempotent RPCs; use exponential backoff + jitter. Avoid retry storms.

---

### Q79. How do you evolve protobuf contracts safely?

- Add optional fields with new numbers  
- Don’t change field meaning/type of existing numbers  
- Reserve deleted numbers/names  
- Use package versioning `user.v2` for breaking changes  

---

### Q80. Practical: When REST vs gRPC in a MERN company?

- **External / mobile / browser:** REST or GraphQL  
- **Internal microservice mesh:** gRPC  
- **Public partners:** REST + OpenAPI  
Gateway pattern: BFF REST → internal gRPC.

---

# SECTION 8 — Microservices & Architecture (Q81–Q90)

### Q81. Monolith vs microservices — when to split?

Start modular monolith unless team/scale needs independent deploy, different scaling profiles, or clear bounded contexts. Microservices add network, ops, distributed data complexity.

---

### Q82. How do services communicate?

- Sync: REST / gRPC  
- Async: message queues (RabbitMQ, Kafka, BullMQ)  
Prefer async for non-critical side effects (emails, analytics).

---

### Q83. What is eventual consistency? Saga pattern?

Distributed transactions are hard. Saga: sequence of local transactions with compensations on failure (choreography or orchestration).

Example: CreateOrder → ReserveInventory → ChargePayment; on payment fail → ReleaseInventory.

---

### Q84. Idempotency keys — why?

Clients retry network failures. Server stores `Idempotency-Key` → result mapping so duplicate POST doesn’t double-charge.

```ts
const existing = await redis.get(`idem:${key}`);
if (existing) return JSON.parse(existing);
const result = await createPayment(...);
await redis.setEx(`idem:${key}`, 86400, JSON.stringify(result));
```

---

### Q85. Circuit breaker / bulkhead / retry?

Resilience patterns:
- Retry with backoff  
- Circuit breaker: stop calling failing dependency temporarily  
- Bulkhead: isolate thread/connection pools  
- Timeout everything  

Libraries: opossum (Node), or service mesh.

---

### Q86. API Gateway / BFF?

Gateway: auth, rate limit, routing, TLS termination.  
BFF (Backend for Frontend): tailor payloads per client (web vs mobile).

---

### Q87. Observability: logs, metrics, traces?

- **Logs:** structured JSON + requestId/correlationId  
- **Metrics:** latency, error rate, saturation (RED/USE)  
- **Traces:** OpenTelemetry across services  

You can’t debug microservices without correlation IDs.

---

### Q88. 12-factor app principles relevant to Node?

Config via env, disposable processes, logs to stdout, backing services as attached resources, concurrency via process model, etc.

---

### Q89. Practical system design: URL shortener (MERN-ish).

- API: `POST /shorten`, `GET /:code` redirect  
- Mongo: `{ code, longUrl, userId, clicks, expiresAt }` unique index on code  
- Redis cache hot redirects  
- Counter / hashids for codes  
- Analytics async via queue  

Discuss collision handling, custom aliases, rate limits.

---

### Q90. Practical: Design notification service.

- API accepts notify request  
- Persist notification  
- Push via websocket / FCM / email workers  
- Redis for unread counts  
- Kafka/BullMQ for fan-out  
- Idempotent delivery attempts  

---

# SECTION 9 — React Frontend (Q91–Q110)

### Q91. What is React’s mental model?

UI = function of state. Components describe UI; React reconciles Virtual DOM diffs efficiently to update real DOM.

---

### Q92. Controlled vs uncontrolled components?

- Controlled: value from React state + `onChange`  
- Uncontrolled: DOM holds value via `ref`  

Forms usually controlled (or React Hook Form hybrid).

---

### Q93. Hooks rules and why?

1. Only call hooks at top level  
2. Only call from React functions  

Enables consistent hook order between renders.

---

### Q94. `useEffect` pitfalls?

- Missing deps → stale closures  
- Object/array deps recreate every render → infinite loops  
- Cleanup for subscriptions/timers  
- Don’t use effects for derived state — compute during render  

```tsx
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);
```

---

### Q95. `useMemo` / `useCallback` — when actually needed?

Not by default. Use when:
- expensive pure calc  
- referential equality needed for child memoization / effect deps  

Overuse adds complexity without gain (especially with React Compiler projects).

---

### Q96. Context API — when good / when bad?

Good: theme, locale, auth user (low-frequency updates).  
Bad: high-frequency state (cursor position) — causes wide re-renders. Prefer colocated state or external stores (Zustand/Redux).

---

### Q97. Redux vs Zustand vs React Query roles?

- **Redux/Zustand:** client UI state  
- **React Query / TanStack Query:** server state (cache, refetch, stale-while-revalidate)  

Don’t put all API responses in Redux anymore unless needed.

```ts
// Zustand sketch
const useAuth = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

---

### Q98. How does reconciliation / keys work in lists?

Keys help React match children across renders. Use stable IDs, not array index (index bad when reorder/insert).

---

### Q99. Code splitting & lazy loading?

```tsx
const Dashboard = React.lazy(() => import('./Dashboard'));
<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>
```

Improves initial load.

---

### Q100. Error boundaries?

Catch render errors in child tree; show fallback UI. Don’t catch event handler errors (use try/catch there).

---

### Q101. React Hook Form vs Formik?

RHF: less re-renders, uncontrolled-friendly, great performance. Formik: classic, more re-render heavy historically. Both + Zod/Yup for schema validation.

---

### Q102. Styling: MUI vs Tailwind vs Ant Design — interview angle?

- **Tailwind:** utility-first, design control, small teams moving fast  
- **MUI/Ant:** component libraries, enterprise admin UIs, theming  

Discuss accessibility, bundle size, design system consistency.

---

### Q103. How do you handle auth on React SPA?

- On boot: try refresh → set access token in memory  
- Axios/fetch interceptor attaches Bearer  
- On 401: attempt refresh once; else logout  
- Route guards based on roles  

---

### Q104. Optimistic UI updates?

Update UI before server confirms; rollback on error. Good for likes/toggles; careful with payments.

---

### Q105. Accessibility basics interviewers ask?

Semantic HTML, labels for inputs, keyboard navigation, focus management, ARIA only when needed, color contrast.

---

### Q106. Practical: Fetch + loading/error pattern.

```tsx
function Users() {
  const [state, setState] = useState({ loading: true, data: [], error: null });
  useEffect(() => {
    let alive = true;
    api.getUsers()
      .then((data) => alive && setState({ loading: false, data, error: null }))
      .catch((error) => alive && setState({ loading: false, data: [], error }));
    return () => { alive = false; };
  }, []);
  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>Failed</p>;
  return <ul>{state.data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

Prefer React Query in real apps.

---

### Q107. Practical: Debounce search input.

```tsx
function useDebounce<T>(value: T, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}
```

---

### Q108. Prop drilling solutions?

Composition, Context, state libraries, component colocation.

---

### Q109. SSR / Next.js awareness (nice if asked)?

SSR improves SEO/TTFB. Hydration mismatch pitfalls. Even if JD says CRA/Vite React, knowing Next is a plus.

---

### Q110. Performance checklist for React apps?

- Avoid unnecessary re-renders  
- Virtualize long lists  
- Memo heavy pure children  
- Compress images  
- Code split routes  
- Measure with React Profiler / Lighthouse  

---

# SECTION 10 — Testing (Q111–Q118)

### Q111. Testing pyramid for MERN?

Many unit tests → fewer integration → few e2e. Balance speed vs confidence.

---

### Q112. What do you unit test in Node services?

- Pure business logic  
- validators  
- mappers  
- permission helpers  

Mock DB/Redis at boundaries.

```ts
test('calculates discount', () => {
  expect(calcDiscount(100, 10)).toBe(90);
});
```

---

### Q113. Integration test example (supertest)?

```ts
import request from 'supertest';
import { app } from '../app';

test('POST /users validates email', async () => {
  const res = await request(app)
    .post('/api/users')
    .send({ email: 'bad' });
  expect(res.status).toBe(400);
});
```

Use test DB / mongodb-memory-server.

---

### Q114. Jest mocking patterns?

`jest.mock('../repo')`, `jest.spyOn`, fake timers for timeouts.

---

### Q115. Frontend testing — React Testing Library philosophy?

Test user behavior, not implementation details. Query by role/text.

```tsx
render(<Login />);
await userEvent.type(screen.getByLabelText(/email/i), 'a@b.com');
await userEvent.click(screen.getByRole('button', { name: /login/i }));
expect(await screen.findByText(/welcome/i)).toBeInTheDocument();
```

---

### Q116. What is coverage useful for / not?

Useful signal for untested modules. 100% coverage ≠ bug-free. Focus critical paths: auth, payments, permissions.

---

### Q117. Contract testing / OpenAPI?

Swagger/OpenAPI documents REST contracts; can generate clients and validate responses. Pact for consumer-driven contracts between services.

---

### Q118. Practical: Test RBAC middleware.

```ts
test('blocks non-admin', async () => {
  const req: any = { user: { roles: ['user'] } };
  const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();
  requireRole('admin')(req, res, next);
  expect(res.status).toHaveBeenCalledWith(403);
  expect(next).not.toHaveBeenCalled();
});
```

---

# SECTION 11 — Docker, CI/CD, Cloud (Q119–Q128)

### Q119. What is Docker? Image vs container?

Image = immutable template. Container = running instance. Solves “works on my machine”.

---

### Q120. Write a simple Node Dockerfile (multi-stage).

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

Don’t run as root; small base image; layer caching.

---

### Q121. docker-compose for local Mongo + Redis + API?

```yaml
services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      MONGO_URI: mongodb://mongo:27017/app
      REDIS_URL: redis://redis:6379
    depends_on: [mongo, redis]
  mongo:
    image: mongo:7
    ports: ["27017:27017"]
  redis:
    image: redis:7
    ports: ["6379:6379"]
```

---

### Q122. CI/CD with GitHub Actions — typical pipeline?

1. checkout  
2. setup Node  
3. npm ci  
4. lint  
5. test  
6. build  
7. docker build/push  
8. deploy (ECS/K8s/VM)  

Secrets via GitHub Secrets. Protect `main` with required checks.

---

### Q123. Blue-green / rolling / canary deployments?

- Rolling: gradually replace instances  
- Blue-green: switch traffic between two environments  
- Canary: small % traffic to new version  

Need health checks + ready/live probes.

---

### Q124. AWS basics often asked with MERN?

- **EC2:** VMs  
- **ECS/Fargate / EKS:** containers  
- **S3:** object storage (images, exports)  
- **Lambda:** event-driven functions  
- **RDS / DocumentDB / Atlas:** databases  
- **CloudWatch:** logs/metrics  
- **ALB:** load balancer  

---

### Q125. How do you store uploads?

Prefer S3 + pre-signed URLs (client uploads direct). Don’t stream huge files through API memory. Use Sharp for image transforms in worker.

---

### Q126. Kubernetes awareness (nice-to-have)?

Pods, Deployments, Services, Ingress, ConfigMaps/Secrets, HPA. Even basics impress mid-senior interviews.

---

### Q127. Logging in production?

Structured JSON logs, levels (info/warn/error), never log passwords/tokens, attach `requestId`, centralize (ELK/Datadog).

---

### Q128. Health check endpoints?

```ts
app.get('/health/live', (_req, res) => res.send('ok'));
app.get('/health/ready', async (_req, res) => {
  await mongoose.connection.db.admin().ping();
  await redis.ping();
  res.send('ready');
});
```

Liveness ≠ readiness.

---

# SECTION 12 — Message Queues & Nice-to-Haves (Q129–Q135)

### Q129. Why message queues (RabbitMQ/Kafka/BullMQ)?

Decouple producers/consumers, smooth load spikes, retries, async workflows (emails, webhooks, image processing).

---

### Q130. Kafka vs RabbitMQ vs BullMQ (Node)?

- **BullMQ:** Redis-based job queues, great for Node background jobs  
- **RabbitMQ:** smart broker, routing, classic work queues  
- **Kafka:** high-throughput event log, replay, stream processing  

---

### Q131. At-least-once vs exactly-once delivery?

Most systems are at-least-once → design **idempotent consumers**. Exactly-once is expensive/complex.

---

### Q132. Dead letter queues?

Failed messages after max retries go to DLQ for inspection/replay.

---

### Q133. PDF/Excel generation in Node?

Libraries: PDFKit/Puppeteer for PDF; ExcelJS for spreadsheets. Generate in worker queues, store in S3, return download link — don’t block API event loop on huge reports.

---

### Q134. Sharp library use case?

High-performance image resize/compress/format convert. Use in upload pipeline or async worker.

---

### Q135. Swagger/OpenAPI benefits?

Living API docs, client generation, contract validation, easier QA/frontend collaboration.

---

# SECTION 13 — Coding Round Favorites (Q136–Q150)

### Q136. Reverse a string / palindrome (warmup).

```ts
const isPalindrome = (s: string) => {
  const t = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return t === [...t].reverse().join('');
};
```

---

### Q137. Debounce & throttle implementations.

```ts
function debounce<T extends (...a: any[]) => void>(fn: T, ms: number) {
  let t: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

function throttle<T extends (...a: any[]) => void>(fn: T, ms: number) {
  let last = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  };
}
```

---

### Q138. Deep equality / flatten object.

Be ready to write recursive flatten:

```ts
function flatten(obj: Record<string, any>, prefix = '', out: any = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}
```

---

### Q139. Express middleware to attach `requestId`.

```ts
import { randomUUID } from 'crypto';
app.use((req, res, next) => {
  const id = (req.headers['x-request-id'] as string) || randomUUID();
  (req as any).requestId = id;
  res.setHeader('x-request-id', id);
  next();
});
```

---

### Q140. Implement in-memory LRU cache (concept).

Use Map insertion order: on get, delete+re-set to refresh; on set over capacity, delete oldest key. Discuss Redis for multi-instance.

---

### Q141. Find duplicates in array / top K frequent.

Use Map counts + bucket sort or sort entries. Know O(n) vs O(n log n).

---

### Q142. REST API design for blog (resources).

```
GET    /posts
POST   /posts
GET    /posts/:id
PATCH  /posts/:id
DELETE /posts/:id
GET    /posts/:id/comments
POST   /posts/:id/comments
```

Auth + ownership checks on mutating routes.

---

### Q143. SQL-ish thinking in Mongo: “second highest salary”.

```js
db.employees.find().sort({ salary: -1 }).skip(1).limit(1)
// or aggregation $setWindowFields in modern Mongo
```

---

### Q144. Write a simple Promise polyfill sketch / Promise.all.

```ts
function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const out: T[] = [];
    let done = 0;
    if (promises.length === 0) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p).then((v) => {
        out[i] = v;
        done += 1;
        if (done === promises.length) resolve(out);
      }, reject);
    });
  });
}
```

---

### Q145. Detect cycle in linked list / dependency graph (basics).

Floyd cycle or DFS coloring for graphs — sometimes asked for general DSA credibility.

---

### Q146. Implement retry with exponential backoff.

```ts
async function retry<T>(fn: () => Promise<T>, attempts = 3) {
  let err;
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); }
    catch (e) {
      err = e;
      await new Promise(r => setTimeout(r, 2 ** i * 100));
    }
  }
  throw err;
}
```

---

### Q147. Mongo query: users inactive 90 days.

```js
db.users.find({ lastLoginAt: { $lt: new Date(Date.now() - 90*864e5) } })
```

Index `lastLoginAt`.

---

### Q148. React: prevent double submit on form.

Disable button on submit; track `isSubmitting`; ignore duplicate clicks; idempotency key on API.

---

### Q149. Debug: API slow in production — your checklist?

1. Metrics: p95 latency which endpoint?  
2. DB `explain` slow queries / missing indexes  
3. N+1 queries  
4. Cache hit ratio  
5. Downstream dependency latency  
6. GC / event loop lag (`perf_hooks` / clinic)  
7. Payload size  
8. Connection pool exhaustion  

---

### Q150. Debug: intermittent 401s after deploy?

Clock skew on JWT `exp`, multiple JWT secrets across instances, load balancer hitting old+new pods during rollout, refresh cookie SameSite/domain misconfig, Redis session store connectivity.

---

# SECTION 14 — Behavioral + Experience Questions (Q151–Q160)

### Q151. Tell me about a production bug you fixed.

Use **STAR**: Situation → Task → Action → Result. Mention metrics (error rate ↓, latency ↓).

---

### Q152. Describe a feature you owned end-to-end.

Cover design, API contract, DB schema, frontend states, tests, rollout, monitoring.

---

### Q153. Conflict with a teammate / designer / PM?

Show listening, data-driven trade-offs, documenting decision, no blame.

---

### Q154. How do you estimate tasks?

Break into design / implementation / tests / buffer for unknowns. Call out risks early.

---

### Q155. How do you do code reviews?

Check correctness, security, readability, tests, performance, API compatibility. Prefer questions over commands; approve incremental improvement.

---

### Q156. Learning something new quickly?

Official docs → small spike → production-shaped PoC → share notes with team.

---

### Q157. Why are you leaving / why this company?

Be positive: growth, architecture exposure (microservices/gRPC), ownership — map to their JD language.

---

### Q158. Strengths / weaknesses?

Strength: e.g. ownership of APIs + pragmatic caching. Weakness: real, with mitigation (e.g. over-polishing → timebox).

---

### Q159. How do you handle on-call / production incidents?

Stabilize first (rollback/feature flag), communicate, gather signals, fix forward, postmortem without blame, add alerts/tests.

---

### Q160. Questions YOU should ask them?

- Microservice boundaries & communication (REST vs gRPC)?  
- On-call expectations?  
- Code ownership model?  
- CI/CD & cloud stack?  
- Biggest engineering challenges this quarter?  

---

# SECTION 15 — Quick-Fire Definitions (Q161–Q170)

### Q161. Idempotent?
Same request N times → same result (no duplicate side effects).

### Q162. Stateless server?
Each request contains all info needed (e.g. JWT); server doesn’t keep client session memory.

### Q163. Horizontal vs vertical scaling?
Horizontal: more machines. Vertical: bigger machine.

### Q164. CAP theorem (practical take)?
In partition, choose availability or consistency. Mongo can be tuned; design for your needs.

### Q165. ACID?
Atomicity, Consistency, Isolation, Durability.

### Q166. BASE?
Basically Available, Soft state, Eventual consistency.

### Q167. CORS preflight?
Browser `OPTIONS` check before “non-simple” cross-origin requests.

### Q168. XSS vs CSRF?
XSS: inject script into page. CSRF: trick browser into sending authenticated request.

### Q169. N+1 query problem?
1 query for list + N queries per item. Fix with `$in`, populate carefully, or aggregation.

### Q170. Hot document / hotspot key?
Many writers contend on one Mongo doc or Redis key → serialize bottleneck. Redesign (shards, buckets).

---

# BONUS — Full Practical Scenarios (speak these end-to-end)

## Scenario A: E-commerce checkout API

Discuss: stock reservation, payment intent, idempotency key, Mongo transaction or saga, order states (`created → paid → fulfilled`), Redis lock per SKU, webhook handling, refunds, audit logs, admin RBAC.

## Scenario B: Realtime chat

WebSockets/Socket.IO, Redis adapter for multi-instance, message persistence, presence sets, rate limits, fan-out, offline push.

## Scenario C: Multi-tenant SaaS

`tenantId` on every doc, indexes `{ tenantId: 1, ... }`, tenant isolation middleware, per-tenant rate limits, careful unique indexes.

---

# 7-Day Crash Revision Plan

| Day | Focus |
|-----|--------|
| 1 | JS/TS + Event loop + Express errors/auth middleware |
| 2 | Mongo indexes, aggregation, transactions, schema design |
| 3 | JWT/OAuth/RBAC + Redis caching/rate limit |
| 4 | React hooks, state, forms, API integration |
| 5 | gRPC + microservices + queues |
| 6 | Docker, CI/CD, debugging scenarios |
| 7 | Mock interview: 20 random Qs + 1 system design + 1 live coding |

---

# Answer Framework (use every time)

1. **Definition** (1–2 lines)  
2. **Why it matters in production**  
3. **How you’ve used it / example**  
4. **Trade-offs / pitfalls**  
5. **Optional:** alternatives  

---

*Total: 170 questions + 3 architecture scenarios + revision plan — covers the full MERN Mid–Senior JD (backend, frontend, DB, auth, Redis, gRPC, testing, DevOps, behavioral).*
