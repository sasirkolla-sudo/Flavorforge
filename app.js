'use strict';

/* =====================================================
   1. DATA  (swap this with fetch('/api/recipes') later)
   i = "ingredient:qty:unit"   |   st = steps separated by |
   v = 1 vegetarian, 0 contains egg/meat
   ===================================================== */
const RECIPES = [
 {n:"Egg Toast",e:"🍞",t:10,d:"Easy",v:0,s:2,i:["egg:2:pc","bread:2:slice","onion:0.5:pc","salt:0.5:tsp","black pepper:0.25:tsp","oil:1:tbsp"],
  st:"Finely chop the onion.|Whisk eggs with onion, salt and pepper.|Heat oil in a pan and dip each bread slice in the egg mix.|Fry 2 minutes per side until golden. Serve hot."},
 {n:"Aloo Egg Bhurji",e:"🍳",t:20,d:"Easy",v:0,s:2,i:["egg:3:pc","potato:2:pc","onion:1:pc","turmeric:0.5:tsp","salt:1:tsp","oil:2:tbsp"],
  st:"Peel and dice the potatoes small so they cook fast.|Heat oil and fry chopped onion until golden.|Add potatoes, turmeric and salt; cook covered 8 minutes.|Crack in the eggs and scramble 2–3 minutes. Serve with toast or roti."},
 {n:"Spanish Omelette",e:"🥔",t:30,d:"Medium",v:0,s:2,i:["egg:4:pc","potato:2:pc","onion:1:pc","butter:1:tbsp","salt:1:tsp","oil:3:tbsp"],
  st:"Thinly slice potatoes and onion.|Slowly cook them in oil with salt until soft, about 12 minutes.|Whisk eggs and fold in the potato mix.|Cook in a pan with butter on low heat, flip once, and cook until set."},
 {n:"Tomato Omelette",e:"🍅",t:10,d:"Easy",v:0,s:2,i:["egg:3:pc","tomato:1:pc","onion:1:pc","green chilli:1:pc","salt:0.5:tsp","oil:1:tbsp"],
  st:"Chop tomato, onion and chilli finely.|Beat eggs with salt and the chopped veggies.|Pour into hot oiled pan and cook 2 minutes per side."},
 {n:"Paneer Bhurji",e:"🧀",t:20,d:"Easy",v:1,s:2,i:["paneer:200:g","onion:1:pc","tomato:2:pc","capsicum:1:pc","chilli powder:1.5:tsp","garam masala:0.5:tsp","salt:0.5:tsp","oil:2:tbsp"],
  st:"Crumble the paneer by hand.|Sauté onion and capsicum in oil for 3 minutes.|Add tomato, chilli powder and salt; cook until mushy.|Stir in paneer and garam masala; cook 3 minutes."},
 {n:"Jeera Aloo",e:"🥔",t:25,d:"Easy",v:1,s:2,i:["potato:3:pc","cumin:1:tsp","lemon:0.5:pc","green chilli:1:pc","salt:0.5:tsp","turmeric:0.25:tsp","oil:2:tbsp"],
  st:"Boil, peel and cube the potatoes.|Splutter cumin in hot oil, add chopped chilli.|Add potatoes, turmeric and salt; fry until crisp edges form.|Finish with a squeeze of lemon."},
 {n:"Tomato Rice",e:"🍚",t:25,d:"Easy",v:1,s:2,i:["rice:1:cup","tomato:3:pc","onion:1:pc","green chilli:1:pc","salt:1:tsp","oil:2:tbsp"],
  st:"Wash and soak the rice for 10 minutes.|Fry onion and chilli in oil, add chopped tomatoes and cook to a thick paste.|Add rice, salt and 2 cups water.|Cover and cook on low heat 15 minutes."},
 {n:"Veg Fried Rice",e:"🍛",t:20,d:"Easy",v:1,s:2,i:["rice:2:cup","carrot:1:pc","capsicum:1:pc","onion:1:pc","garlic:3:clove","pea:0.5:cup","salt:1:tsp","black pepper:0.5:tsp","oil:2:tbsp"],
  st:"Use cooled, cooked rice for best texture.|Stir-fry garlic and onion on high heat 1 minute.|Add chopped carrot, capsicum and peas for 3 minutes.|Toss in rice, salt and pepper for 3 minutes."},
 {n:"Cheese Chilli Toast",e:"🧀",t:10,d:"Easy",v:1,s:2,i:["bread:4:slice","cheese:4:tbsp","capsicum:0.5:pc","green chilli:1:pc","black pepper:0.25:tsp","oil:1:tsp"],
  st:"Finely chop capsicum and chilli; mix with grated cheese and pepper.|Spread over bread slices.|Toast in an oiled pan (covered) or oven until cheese melts."},
 {n:"French Toast",e:"🥞",t:15,d:"Easy",v:0,s:2,i:["bread:4:slice","egg:2:pc","milk:0.5:cup","sugar:1:tbsp","oil:1:tbsp"],
  st:"Whisk eggs, milk and sugar together.|Soak each bread slice for 10 seconds per side.|Cook in a lightly oiled pan until golden on both sides."},
 {n:"Veg Poha",e:"🥣",t:20,d:"Easy",v:1,s:2,i:["poha:1.5:cup","onion:1:pc","potato:1:pc","pea:0.25:cup","lemon:1:pc","green chilli:2:pc","turmeric:0.5:tsp","salt:0.5:tsp","oil:2:tbsp"],
  st:"Rinse poha in a sieve and let it soften 5 minutes.|Fry diced potato and peas in oil until tender.|Add onion, chilli and turmeric and cook 2 minutes.|Fold in poha and salt, heat through, finish with lemon."},
 {n:"Rava Upma",e:"🥘",t:20,d:"Easy",v:1,s:2,i:["rava:1:cup","onion:1:pc","carrot:1:pc","green chilli:2:pc","ginger:1:tsp","water:2.5:cup","salt:1:tsp","oil:2:tbsp"],
  st:"Dry-roast rava until fragrant, set aside.|Fry onion, chilli, ginger and carrot in oil.|Add hot water and salt; bring to a boil.|Pour rava in slowly, stirring, then cover 3 minutes."},
 {n:"Masala Pasta",e:"🍝",t:25,d:"Medium",v:1,s:2,i:["pasta:200:g","tomato:2:pc","onion:1:pc","capsicum:1:pc","garlic:3:clove","chilli powder:1:tsp","salt:1:tsp","oil:2:tbsp","water:4:cup"],
  st:"Boil pasta in salted water until al dente; drain.|Sauté garlic and onion, add capsicum.|Add chopped tomato and chilli powder; cook into a thick sauce.|Toss in pasta and cook 2 minutes."},
 {n:"Aloo Tikki",e:"🥔",t:30,d:"Medium",v:1,s:3,i:["potato:4:pc","bread:1:slice","coriander:2:tbsp","green chilli:2:pc","chilli powder:1:tsp","salt:1:tsp","oil:3:tbsp"],
  st:"Boil, peel and mash the potatoes.|Crumble the bread in as a binder and add coriander, chilli and spices.|Shape into flat patties.|Shallow-fry until crisp and brown on both sides."},
 {n:"Rice Kheer",e:"🍚",t:45,d:"Medium",v:1,s:3,i:["rice:0.25:cup","milk:2:cup","sugar:3:tbsp"],
  st:"Rinse rice and soak for 15 minutes.|Boil milk, add rice and simmer on low, stirring often.|Cook 30 minutes until creamy, add sugar and cook 5 more minutes."},
 {n:"Palak Paneer",e:"🥬",t:35,d:"Hard",v:1,s:3,i:["spinach:250:g","paneer:200:g","onion:1:pc","tomato:1:pc","garlic:4:clove","ginger:1:tsp","garam masala:0.5:tsp","salt:1:tsp","oil:2:tbsp","water:0.5:cup"],
  st:"Blanch spinach 2 minutes, then blend to a puree.|Fry onion, garlic and ginger, add tomato and cook down.|Add puree, salt and water; simmer 5 minutes.|Add cubed paneer and garam masala; simmer 3 minutes."},
 {n:"Curd Rice",e:"🍚",t:10,d:"Easy",v:1,s:2,i:["rice:1:cup","curd:1:cup","ginger:1:tsp","green chilli:1:pc","salt:0.5:tsp"],
  st:"Mash warm cooked rice slightly.|Mix in curd and salt.|Top with grated ginger and chopped chilli. Chill and serve."},
 {n:"Aloo Paratha",e:"🫓",t:40,d:"Medium",v:1,s:4,i:["flour:2:cup","potato:3:pc","green chilli:2:pc","coriander:2:tbsp","cumin:0.5:tsp","salt:1:tsp","oil:3:tbsp","water:0.75:cup"],
  st:"Knead flour with water and a pinch of salt; rest 15 minutes.|Mash boiled potato with chilli, coriander, cumin and salt.|Stuff dough balls with filling and roll out gently.|Cook on a hot pan with oil until golden spots appear."},
 {n:"Grilled Cheese Sandwich",e:"🥪",t:10,d:"Easy",v:1,s:2,i:["bread:4:slice","cheese:2:slice","butter:2:tbsp"],
  st:"Butter one side of each slice.|Sandwich cheese between slices, butter side out.|Grill in a pan on medium-low until golden and melty."},
 {n:"Egg Fried Rice",e:"🍳",t:20,d:"Easy",v:0,s:2,i:["rice:2:cup","egg:2:pc","onion:1:pc","carrot:1:pc","garlic:2:clove","salt:1:tsp","black pepper:0.5:tsp","oil:2:tbsp"],
  st:"Scramble the eggs in oil and set aside.|Stir-fry garlic, onion and carrot on high heat.|Add cooked rice, salt and pepper; toss 3 minutes.|Fold the eggs back in."},
 {n:"Lemon Rice",e:"🍋",t:15,d:"Easy",v:1,s:2,i:["rice:1.5:cup","lemon:1:pc","green chilli:2:pc","ginger:1:tsp","turmeric:0.5:tsp","salt:1:tsp","oil:2:tbsp"],
  st:"Use cooked, cooled rice.|Heat oil, add chilli, ginger and turmeric.|Add rice and salt, toss gently.|Turn off heat and stir in lemon juice."},
 {n:"Cucumber Raita",e:"🥒",t:5,d:"Easy",v:1,s:2,i:["curd:1:cup","cucumber:1:pc","cumin:0.5:tsp","salt:0.5:tsp"],
  st:"Grate or dice the cucumber and squeeze out excess water.|Whisk curd until smooth.|Mix everything, dust with roasted cumin and chill."},
 {n:"Matar Paneer",e:"🫛",t:30,d:"Medium",v:1,s:3,i:["paneer:200:g","pea:1:cup","onion:2:pc","tomato:2:pc","garam masala:1:tsp","turmeric:0.5:tsp","salt:1:tsp","oil:2:tbsp"],
  st:"Blend onion and tomato into a paste.|Cook the paste in oil with turmeric until oil separates.|Add peas, salt and a splash of water; simmer 8 minutes.|Add paneer cubes and garam masala; simmer 4 minutes."},
 {n:"Aloo Gobi",e:"🥦",t:35,d:"Medium",v:1,s:3,i:["potato:2:pc","cauliflower:300:g","onion:1:pc","tomato:1:pc","cumin:1:tsp","turmeric:0.5:tsp","salt:1:tsp","oil:2:tbsp"],
  st:"Cut potato and cauliflower into bite-size pieces.|Splutter cumin in oil, add onion and cook until golden.|Add tomato, turmeric, salt and the vegetables.|Cover and cook on low for 15–20 minutes, stirring occasionally."},
 {n:"Fluffy Pancakes",e:"🥞",t:20,d:"Easy",v:0,s:3,i:["flour:1:cup","milk:1:cup","egg:1:pc","sugar:2:tbsp","butter:2:tbsp"],
  st:"Whisk flour, sugar, milk and egg into a smooth batter.|Heat a pan and brush with butter.|Pour small rounds; flip when bubbles appear.|Cook until golden on both sides."}
];

/* Common-swap rules keyed by canonical ingredient */
const SUBS = {
  butter:"Use cooking oil or ghee instead of butter.",
  milk:"Use water + a spoon of curd, or any plant milk.",
  curd:"Use Milk + Lemon Juice (rest 10 min).",
  paneer:"Use firm tofu or crumbled boiled egg.",
  cheese:"Use crumbled paneer with a pinch of salt.",
  egg:"Use 2 tbsp curd or ¼ cup mashed banana per egg (baking).",
  lemon:"Use vinegar or tamarind water.",
  tomato:"Use 2 tbsp ketchup per tomato, or curd + a pinch of sugar.",
  onion:"Use spring onion, or extra garlic + a pinch of asafoetida.",
  capsicum:"Use cabbage or an extra green chilli.",
  garlic:"Use ginger or ¼ tsp garlic powder per clove.",
  ginger:"Use ½ tsp dry ginger powder.",
  'green chilli':"Use chilli powder or black pepper.",
  coriander:"Use parsley, or just skip it.",
  cumin:"Use mustard seeds or coriander powder.",
  rava:"Use broken wheat or crushed oats.",
  poha:"Use cooked rice or puffed rice (murmura).",
  bread:"Use chapati or a burger bun.",
  flour:"Use whole wheat atta or semolina.",
  rice:"Use quinoa or couscous.",
  pasta:"Use macaroni or noodles.",
  potato:"Use sweet potato or raw banana.",
  carrot:"Use beetroot or capsicum.",
  pea:"Use corn or chopped green beans.",
  spinach:"Use fenugreek leaves or kale.",
  cauliflower:"Use cabbage or broccoli.",
  cucumber:"Use grated radish or carrot.",
  'chilli powder':"Use black pepper or paprika.",
  'garam masala':"Mix cumin + coriander powder + a pinch of cinnamon."
};

const GROUPS = {
  "🥬 Veggies":[["🧅","Onion"],["🍅","Tomato"],["🥔","Potato"],["🫑","Capsicum"],["🥬","Spinach"],["🥕","Carrot"],["🧄","Garlic"],["🫚","Ginger"],["🌶️","Green Chilli"],["🫛","Peas"],["🥦","Cauliflower"],["🥒","Cucumber"]],
  "🥛 Dairy & Eggs":[["🥚","Egg"],["🥛","Milk"],["🧀","Paneer"],["🧈","Butter"],["🧀","Cheese"],["🥣","Curd"]],
  "🌾 Grains & Bread":[["🍚","Rice"],["🍞","Bread"],["🍝","Pasta"],["🌾","Flour"],["🥣","Rava"],["🥣","Poha"]],
  "🌶️ Spices & Extras":[["🍋","Lemon"],["🌿","Cumin"],["🌶️","Chilli Powder"],["🧂","Garam Masala"],["🌿","Coriander"]]
};

const STAPLES = new Set(['salt','oil','water','black pepper','turmeric','sugar']);

/* =====================================================
   2. NORMALISATION & FORMAT HELPERS
   ===================================================== */
const SYN = {'bell pepper':'capsicum','shimla mirch':'capsicum','green pepper':'capsicum','chilli':'green chilli','chili':'green chilli','chilly':'green chilli','green chili':'green chilli','green chilly':'green chilli','yogurt':'curd','yoghurt':'curd','dahi':'curd','cilantro':'coriander','coriander leaf':'coriander','coriander leave':'coriander','aloo':'potato','pyaz':'onion','tamatar':'tomato','chawal':'rice','atta':'flour','maida':'flour','suji':'rava','semolina':'rava','green pea':'pea','matar':'pea','anda':'egg','cottage cheese':'paneer','lime':'lemon','gobi':'cauliflower','palak':'spinach','chili powder':'chilli powder','red chilli powder':'chilli powder','lehsun':'garlic','adrak':'ginger','flattened rice':'poha','beaten rice':'poha'};

function norm(s){
  s = String(s).toLowerCase().trim().replace(/\s+/g,' ');
  if (SYN[s]) return SYN[s];
  let t = s;
  if (/oes$/.test(t)) t = t.slice(0,-2);
  else if (/ies$/.test(t)) t = t.slice(0,-3)+'y';
  else if (/s$/.test(t) && !/(ss|us)$/.test(t)) t = t.slice(0,-1);
  return SYN[t] || t;
}
const cap = s => s.replace(/\b\w/g, c => c.toUpperCase());

const FR = [[0,''],[.125,'1/8'],[.25,'1/4'],[1/3,'1/3'],[.375,'3/8'],[.5,'1/2'],[.625,'5/8'],[2/3,'2/3'],[.75,'3/4'],[.875,'7/8'],[1,'']];
function fmt(q,u){
  if (u==='g' || u==='ml') return String(Math.max(5, Math.round(q/5)*5));
  let w = Math.floor(q+1e-9), f = q-w, best = FR[0];
  for (const x of FR) if (Math.abs(x[0]-f) < Math.abs(best[0]-f)) best = x;
  if (best[0]===1){ w += 1; best = FR[0]; }
  if (w===0 && best[0]===0) return '1/8';
  return [w||'', best[1]].filter(Boolean).join(' ');
}
function ingText(i, mult){
  const q = i.q*mult;
  let u = i.u==='pc' ? '' : i.u;
  if (u && q>1 && ['cup','slice','clove'].includes(u)) u += 's';
  let name = i.name;
  if (i.u==='pc' && q>1) name += /o$/.test(name) ? 'es' : 's';
  return `${fmt(q,i.u)} ${u} ${name}`.replace(/\s+/g,' ').trim();
}

/* Compile recipes */
const R = RECIPES.map((r,id) => ({
  id, name:r.n, emoji:r.e, time:r.t, diff:r.d, veg:!!r.v, base:r.s,
  ing: r.i.map(x => { const [n,q,u] = x.split(':'); const key = norm(n);
        return {name:cap(n), key, q:+q, u, staple:STAPLES.has(key)}; }),
  steps: r.st.split('|')
}));

/* =====================================================
   3. STATE
   ===================================================== */
const load = (k,d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch(e){ return d; } };
const save = (k,v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };

let pantry = new Set(load('ff_pantry', []));
let favs   = new Set(load('ff_favs', []));
let view = 'rescue', cur = null, serv = 2;
const $ = id => document.getElementById(id);

/* =====================================================
   4. MATCH ALGORITHM  (set intersection, staples excluded)
   ===================================================== */
function score(r){
  const core = r.ing.filter(i => !i.staple);
  const have = core.filter(i => pantry.has(i.key));
  const missing = core.filter(i => !pantry.has(i.key));
  const pct = core.length ? Math.round(have.length/core.length*100) : 100;
  return {pct, have, missing, core};
}
const lvl = p => p>=80 ? 'hi' : p>=50 ? 'mid' : 'lo';
const diffTxt = n => `${n} ingredient${n===1?'':'s'}`;

/* =====================================================
   5. PANTRY UI
   ===================================================== */
function buildGroups(){
  $('groups').innerHTML = Object.entries(GROUPS).map(([g,items]) =>
    `<div class="group"><h3>${g}</h3><div class="tags">` +
    items.map(([e,n]) => `<button class="tag" data-k="${norm(n)}" onclick="toggleItem('${norm(n)}')"><span>${e}</span>${n}</button>`).join('') +
    `</div></div>`).join('');
  const names = new Set();
  R.forEach(r => r.ing.forEach(i => { if(!i.staple) names.add(i.name); }));
  Object.keys(SYN).forEach(k => names.add(cap(k)));
  $('allIng').innerHTML = [...names].sort().map(n => `<option value="${n}">`).join('');
}
function renderChips(){
  const arr = [...pantry];
  $('chips').innerHTML = arr.length
    ? arr.map(k => `<span class="chip">${cap(k)}<button aria-label="Remove" onclick="toggleItem('${k}')">×</button></span>`).join('')
    : `<span class="hint">Nothing yet — tap items below ↓</span>`;
  $('count').textContent = `${arr.length} item${arr.length===1?'':'s'}`;
  document.querySelectorAll('.tag').forEach(b => b.classList.toggle('on', pantry.has(b.dataset.k)));
}
function refresh(){ save('ff_pantry',[...pantry]); renderChips(); renderResults(); }
function toggleItem(k){ pantry.has(k) ? pantry.delete(k) : pantry.add(k); refresh(); }
function addCustom(e){
  e.preventDefault();
  const v = $('custom').value; if(!v.trim()) return;
  const k = norm(v); pantry.add(k); $('custom').value = '';
  refresh(); toast(`Added ${cap(k)} 🎉`);
}
function clearPantry(){ pantry.clear(); refresh(); }
function demoPick(){ pantry = new Set(['egg','potato','onion']); refresh(); toast('Demo: Egg, Potato, Onion 🥚🥔🧅'); }

/* =====================================================
   6. RESULTS GRID
   ===================================================== */
function setView(v){
  view = v;
  $('tabRescue').classList.toggle('active', v==='rescue');
  $('tabSaved').classList.toggle('active', v==='saved');
  renderResults();
}
function setFilter(){ renderResults(); }

function renderResults(){
  const quick = $('fQuick').checked, vegOnly = $('fVeg').checked;
  const grid = $('grid');

  if (view==='rescue' && !pantry.size){
    grid.innerHTML = `<div class="empty"><span class="big">🥕</span><h3>Your fridge is empty (on screen)</h3>
      <p>Tap a few ingredients to see what you can cook.</p><button class="btn" onclick="demoPick()">▶ Try demo (Egg, Potato, Onion)</button></div>`;
    return;
  }
  let list = R.map(r => ({r, ...score(r)}));
  list = view==='saved' ? list.filter(x => favs.has(x.r.id)) : list.filter(x => x.pct>0);
  if (quick)   list = list.filter(x => x.r.time < 20);
  if (vegOnly) list = list.filter(x => x.r.veg);
  list.sort((a,b) => b.pct-a.pct || a.missing.length-b.missing.length || a.r.time-b.r.time);

  if (!list.length){
    grid.innerHTML = `<div class="empty"><span class="big">${view==='saved'?'💔':'🤔'}</span><h3>${view==='saved'?'No saved recipes yet':'No matches found'}</h3>
      <p>${view==='saved'?'Tap the heart on any recipe to save it.':'Try adding more items or turning off filters.'}</p></div>`;
    return;
  }
  grid.innerHTML = list.map((x,idx) => {
    const {r,pct,missing} = x, c = lvl(pct);
    const status = missing.length
      ? `${pct}% Match · Missing ${diffTxt(missing.length)}`
      : `${pct}% Match · You have everything! 🎉`;
    return `<article class="card ${pct===100?'perfect':''}" style="--i:${idx}" onclick="openRecipe(${r.id})">
      <button class="heart ${favs.has(r.id)?'on':''}" data-fav="${r.id}" onclick="toggleFav(${r.id},event)" aria-label="Save">❤️</button>
      <div class="c-top">
        <div class="c-emoji">${r.emoji}</div>
        <div class="c-title"><h3>${r.name}</h3>
          <div class="meta"><span>⏱ ${r.time} min</span><span>${r.diff}</span><span class="${r.veg?'veg':'nveg'}">${r.veg?'Veg':'Egg'}</span></div></div>
        <svg class="ring ${c}" viewBox="0 0 44 44"><circle class="trk" cx="22" cy="22" r="18"/><circle class="bar" cx="22" cy="22" r="18" style="--p:${pct}"/>
          <text x="22" y="22" transform="rotate(90 22 22)" text-anchor="middle" dominant-baseline="central">${pct}%</text></svg>
      </div>
      <div class="status ${c}">${status}</div>
      <div class="pills">${missing.map(m => `<button class="pill" onclick="event.stopPropagation();openSub('${m.key}')">✗ ${m.name}</button>`).join('')}</div>
    </article>`;
  }).join('');
}

/* =====================================================
   7. FAVOURITES
   ===================================================== */
function toggleFav(id, ev){
  if (ev) ev.stopPropagation();
  const was = favs.has(id);
  was ? favs.delete(id) : favs.add(id);
  save('ff_favs',[...favs]);
  $('savedCount').textContent = favs.size;
  document.querySelectorAll(`[data-fav="${id}"]`).forEach(b => b.classList.toggle('on', !was));
  syncFavBtn();
  toast(was ? 'Removed from saved' : 'Saved to favourites ❤️');
  if (view==='saved' && was && !$('recipeModal').classList.contains('open')) renderResults();
}
function syncFavBtn(){
  const b = $('favBtn'); if(!b||!cur) return;
  const on = favs.has(cur.id);
  b.classList.toggle('on', on);
  b.textContent = on ? '❤️ Saved' : '🤍 Save recipe';
}

/* =====================================================
   8. RECIPE MODAL (scaler, steps, voice)
   ===================================================== */
function openRecipe(id, keepServ){
  cur = R[id]; serv = keepServ || cur.base;
  const {pct, missing} = score(cur), c = lvl(pct);
  $('sheet').innerHTML = `
    <button class="x" onclick="closeRecipe()" aria-label="Close">✕</button>
    <div class="r-head"><div class="r-emoji">${cur.emoji}</div>
      <div><h2>${cur.name}</h2>
        <div class="meta"><span>⏱ ${cur.time} min</span><span>📊 ${cur.diff}</span><span class="${cur.veg?'veg':'nveg'}">${cur.veg?'Vegetarian':'Contains egg'}</span></div></div></div>
    <div class="r-match"><span class="status ${c}">${pct}% Match</span>
      <small>${missing.length ? 'Missing: '+missing.map(m=>m.name).join(', ') : 'You have everything you need!'}</small></div>
    <div class="stepper">🍽 Servings
      <button onclick="changeServ(-1)">−</button><b id="servNum">${serv}</b><button onclick="changeServ(1)">+</button></div>
    <h3>🧾 Ingredients</h3><ul class="ings" id="ings"></ul>
    <h3>👩‍🍳 Method <small style="color:var(--mut);font-weight:400">(tap a step to tick it off)</small></h3>
    <ol class="steps">${cur.steps.map(s => `<li onclick="this.classList.toggle('done')">${s}</li>`).join('')}</ol>
    <div class="actions">
      <button class="btn" id="favBtn" onclick="toggleFav(${cur.id})"></button>
      <button class="btn ghost" id="voiceBtn" onclick="readAloud()">🔊 Read aloud</button>
    </div>`;
  renderIngs(); syncFavBtn();
  $('recipeModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function renderIngs(){
  const mult = serv/cur.base;
  $('ings').innerHTML = cur.ing.map((i,idx) => {
    const have = i.staple || pantry.has(i.key);
    return `<li class="${have?'ok':'miss'}" style="--i:${idx}"><span>${have?'✅':'❌'}</span><span class="q">${ingText(i,mult)}</span>` +
      (i.staple ? `<span class="tagst">staple</span>` : have ? '' : `<button class="swap" onclick="openSub('${i.key}')">💡 Swap</button>`) + `</li>`;
  }).join('');
}
function changeServ(d){
  serv = Math.min(12, Math.max(1, serv+d));
  const n = $('servNum'); n.textContent = serv; n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump');
  renderIngs();
}
function closeRecipe(){
  $('recipeModal').classList.remove('open');
  document.body.style.overflow = '';
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (view==='saved') renderResults();
}
function readAloud(){
  if (!('speechSynthesis' in window)) return toast('Voice not supported in this browser');
  const btn = $('voiceBtn');
  if (speechSynthesis.speaking){ speechSynthesis.cancel(); btn.textContent = '🔊 Read aloud'; return; }
  btn.textContent = '⏹ Stop';
  cur.steps.forEach((s,i) => {
    const u = new SpeechSynthesisUtterance(`Step ${i+1}. ${s}`);
    u.rate = .95;
    if (i === cur.steps.length-1) u.onend = () => btn.textContent = '🔊 Read aloud';
    speechSynthesis.speak(u);
  });
}

/* =====================================================
   9. SUBSTITUTION MODAL
   ===================================================== */
function openSub(key){
  const tip = SUBS[key] || 'No standard swap — try skipping it or borrowing from a neighbour 😄';
  $('subSheet').innerHTML = `
    <button class="x" onclick="closeSub()" aria-label="Close">✕</button>
    <div class="sub-emoji">💡</div>
    <h2>No ${cap(key)}?</h2>
    <div class="sub-tip">${tip}</div>
    <div class="actions" style="justify-content:center">
      <button class="btn" onclick="haveNow('${key}')">I have it now ✓</button>
      <button class="btn ghost" onclick="closeSub()">Got it</button>
    </div>`;
  $('subModal').classList.add('open');
}
function closeSub(){ $('subModal').classList.remove('open'); }
function haveNow(key){
  pantry.add(key); refresh(); closeSub();
  if ($('recipeModal').classList.contains('open') && cur) openRecipe(cur.id, serv);
  toast(`${cap(key)} added ✅`);
}

/* =====================================================
   10. TOAST, FLOATERS, INIT
   ===================================================== */
let tT;
function toast(msg){
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(tT); tT = setTimeout(() => t.classList.remove('show'), 2000);
}
function floaters(){
  const em = ['🍅','🥚','🧅','🥔','🧀','🍞','🥕','🍋','🌶️','🥛','🍚','🥦'];
  $('floaters').innerHTML = Array.from({length:14}, (_,i) =>
    `<span style="left:${Math.random()*100}%;font-size:${22+Math.random()*28}px;animation-duration:${18+Math.random()*20}s;animation-delay:-${Math.random()*30}s">${em[i%em.length]}</span>`).join('');
}
document.addEventListener('keydown', e => {
  if (e.key==='Escape'){ $('subModal').classList.contains('open') ? closeSub() : closeRecipe(); }
});

buildGroups(); floaters();
$('savedCount').textContent = favs.size;
refresh();