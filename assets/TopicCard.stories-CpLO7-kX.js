import{j as e}from"./jsx-runtime-ByoxmMqQ.js";import{u as G,L as J,F as Q,B as V}from"./file-text-y4fIgJ_6.js";import{c as a}from"./utils-CytzSlOG.js";import{r as C}from"./iframe-8XAWmlfa.js";import{S as U}from"./star-DmJW3ECa.js";import{C as X}from"./chevron-right-PR12MJ5r.js";import"./index-Cdj39i1t.js";import"./createLucideIcon-DSUwoSRr.js";import"./preload-helper-C1FmrZbK.js";const x=768;function Z(){const[s,t]=C.useState(void 0);return C.useEffect(()=>{const n=window.matchMedia(`(max-width: ${x-1}px)`),i=()=>{t(window.innerWidth<x)};return n.addEventListener("change",i),t(window.innerWidth<x),()=>n.removeEventListener("change",i)},[]),!!s}const $={"🎨":"bg-pink-500/10 dark:bg-pink-500/20","📦":"bg-emerald-500/10 dark:bg-emerald-500/20","🏋️":"bg-blue-500/10 dark:bg-blue-500/20","☕":"bg-amber-500/10 dark:bg-amber-500/20","🐶":"bg-yellow-500/10 dark:bg-yellow-500/20","📅":"bg-amber-500/10 dark:bg-amber-500/20","🚀":"bg-violet-500/10 dark:bg-violet-500/20","💻":"bg-slate-500/10 dark:bg-slate-500/20","📢":"bg-orange-500/10 dark:bg-orange-500/20","🤝":"bg-teal-500/10 dark:bg-teal-500/20","💰":"bg-green-500/10 dark:bg-green-500/20","👥":"bg-indigo-500/10 dark:bg-indigo-500/20","🔬":"bg-cyan-500/10 dark:bg-cyan-500/20","⚖️":"bg-gray-500/10 dark:bg-gray-500/20","🎉":"bg-rose-500/10 dark:bg-rose-500/20"},K="bg-slate-500/10 dark:bg-slate-500/20";function Y({topic:s}){var S;const t=G(),n=Z(),i=$[s.icon]||K,g=()=>{t(`/topic/${s.id}`)},v=n?1:2,h=s.sessionCount-v;return e.jsx("div",{onClick:g,className:"group rounded-xl border border-border bg-card overflow-hidden transition-smooth hover:border-primary/20 hover:shadow-md cursor-pointer",children:e.jsxs("div",{className:"p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:a("flex h-10 w-10 items-center justify-center rounded-lg",i),children:e.jsx("span",{className:"text-lg",children:s.icon})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-semibold text-foreground",children:s.name}),e.jsxs("div",{className:"flex items-center gap-2 mt-0.5",children:[e.jsx("span",{className:"text-xs text-muted-foreground",children:s.date}),e.jsx("span",{className:"text-xs text-muted-foreground",children:"•"}),e.jsx("span",{className:"text-xs text-muted-foreground",children:"Active"})]})]})]}),e.jsx("button",{className:"p-1.5 rounded-full hover:bg-muted transition-smooth",onClick:r=>r.stopPropagation(),children:e.jsx(U,{className:a("h-4 w-4 transition-smooth",s.isFavorite?"fill-yellow-400 text-yellow-400":"text-muted-foreground hover:text-yellow-400")})})]}),e.jsxs("div",{className:"space-y-2",children:[(S=s.sessions)==null?void 0:S.slice(0,v).map(r=>e.jsxs(J,{to:`/topic/${s.id}?tab=sessions`,onClick:z=>z.stopPropagation(),className:"flex items-center gap-3 rounded-lg bg-muted/50 hover:bg-muted p-3 transition-smooth group/session",children:[e.jsx("div",{className:"flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground",children:e.jsx(Q,{className:"h-4 w-4"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-sm font-medium text-foreground truncate",children:r.title}),e.jsxs("p",{className:"text-xs text-muted-foreground mt-0.5",children:[r.date," · ",r.duration]})]}),e.jsx(X,{className:"h-4 w-4 text-muted-foreground opacity-0 group-hover/session:opacity-100 transition-opacity shrink-0"})]},r.id)),h>0&&e.jsxs("div",{className:"w-full text-center text-xs text-muted-foreground py-2",children:["+",h," more session",h!==1?"s":""]})]})]})})}function b({topic:s,isSelected:t,onSelect:n}){const i=$[s.icon]||K,g=()=>{n==null||n(s.id)};return e.jsx("div",{onClick:g,className:a("group rounded-xl border bg-card p-3 transition-smooth hover:border-primary/20 hover:shadow-sm cursor-pointer",t?"border-primary bg-primary/5":"border-border"),children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:a("flex h-9 w-9 items-center justify-center rounded-lg",i),children:e.jsx("span",{className:"text-base",children:s.icon})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h3",{className:"text-sm font-semibold text-foreground truncate",children:s.name}),e.jsxs("p",{className:"text-xs text-muted-foreground",children:[s.sessionCount," sessions"]})]}),e.jsx(U,{className:a("h-4 w-4 shrink-0",s.isFavorite?"fill-yellow-400 text-yellow-400":"text-muted-foreground/30")})]})})}Y.__docgenInfo={description:"",methods:[],displayName:"TopicCard",props:{topic:{required:!0,tsType:{name:"Topic"},description:""}}};b.__docgenInfo={description:"",methods:[],displayName:"TopicCardSelectable",props:{topic:{required:!0,tsType:{name:"Topic"},description:""},isSelected:{required:!1,tsType:{name:"boolean"},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""}}};const{fn:f}=__STORYBOOK_MODULE_TEST__,ce={title:"Components/TopicCard",component:Y,tags:["autodocs"],parameters:{layout:"centered"},decorators:[s=>e.jsx(V,{children:e.jsx("div",{className:"w-[350px]",children:e.jsx(s,{})})})]},o={args:{topic:{id:"1",name:"Hedy Redesign",icon:"🎨",sessionCount:10,date:"Dec 1",isFavorite:!1,sessions:[{id:"s1",title:"Design Review: Mobile App Refresh",date:"Oct 22",duration:"45 min"},{id:"s2",title:"UI Component Library Planning",date:"Oct 20",duration:"30 min"}]}}},d={args:{topic:{id:"2",name:"Product Launch",icon:"🚀",sessionCount:8,date:"Oct 10",isFavorite:!0,sessions:[{id:"s12",title:"Launch Timeline Review",date:"Oct 10",duration:"55 min"},{id:"s13",title:"Marketing Coordination",date:"Oct 8",duration:"40 min"}]}}},c={args:{topic:{id:"3",name:"Customer Success",icon:"🤝",sessionCount:12,date:"Oct 3",sharedBy:"Sarah",isFavorite:!1,sessions:[{id:"s18",title:"Customer Feedback Analysis",date:"Oct 3",duration:"40 min"},{id:"s19",title:"Support Ticket Review",date:"Oct 1",duration:"30 min"}]}}},l={args:{topic:{id:"4",name:"Legal",icon:"⚖️",sessionCount:2,date:"Sep 20",isFavorite:!1,sessions:[{id:"s26",title:"Contract Review",date:"Sep 20",duration:"35 min"}]}}},m={args:{topic:{id:"5",name:"Engineering",icon:"💻",sessionCount:15,date:"Oct 8",description:"Technical discussions and sprint planning",isFavorite:!1,sessions:[{id:"s14",title:"Sprint Retrospective",date:"Oct 8",duration:"45 min"},{id:"s15",title:"Architecture Discussion",date:"Oct 5",duration:"60 min"}]}}};f();const u={render:s=>e.jsx(b,{...s}),args:{topic:{id:"1",name:"Hedy Redesign",icon:"🎨",sessionCount:10,date:"Dec 1",isFavorite:!1},isSelected:!1,onSelect:f()}},p={render:s=>e.jsx(b,{...s}),args:{topic:{id:"2",name:"Product Launch",icon:"🚀",sessionCount:8,date:"Oct 10",isFavorite:!0},isSelected:!0,onSelect:f()}};var y,j,w;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    topic: {
      id: '1',
      name: 'Hedy Redesign',
      icon: '🎨',
      sessionCount: 10,
      date: 'Dec 1',
      isFavorite: false,
      sessions: [{
        id: 's1',
        title: 'Design Review: Mobile App Refresh',
        date: 'Oct 22',
        duration: '45 min'
      }, {
        id: 's2',
        title: 'UI Component Library Planning',
        date: 'Oct 20',
        duration: '30 min'
      }]
    }
  }
}`,...(w=(j=o.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var N,k,O;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    topic: {
      id: '2',
      name: 'Product Launch',
      icon: '🚀',
      sessionCount: 8,
      date: 'Oct 10',
      isFavorite: true,
      sessions: [{
        id: 's12',
        title: 'Launch Timeline Review',
        date: 'Oct 10',
        duration: '55 min'
      }, {
        id: 's13',
        title: 'Marketing Coordination',
        date: 'Oct 8',
        duration: '40 min'
      }]
    }
  }
}`,...(O=(k=d.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};var T,F,R;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    topic: {
      id: '3',
      name: 'Customer Success',
      icon: '🤝',
      sessionCount: 12,
      date: 'Oct 3',
      sharedBy: 'Sarah',
      isFavorite: false,
      sessions: [{
        id: 's18',
        title: 'Customer Feedback Analysis',
        date: 'Oct 3',
        duration: '40 min'
      }, {
        id: 's19',
        title: 'Support Ticket Review',
        date: 'Oct 1',
        duration: '30 min'
      }]
    }
  }
}`,...(R=(F=c.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var L,D,M;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    topic: {
      id: '4',
      name: 'Legal',
      icon: '⚖️',
      sessionCount: 2,
      date: 'Sep 20',
      isFavorite: false,
      sessions: [{
        id: 's26',
        title: 'Contract Review',
        date: 'Sep 20',
        duration: '35 min'
      }]
    }
  }
}`,...(M=(D=l.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var _,E,B;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    topic: {
      id: '5',
      name: 'Engineering',
      icon: '💻',
      sessionCount: 15,
      date: 'Oct 8',
      description: 'Technical discussions and sprint planning',
      isFavorite: false,
      sessions: [{
        id: 's14',
        title: 'Sprint Retrospective',
        date: 'Oct 8',
        duration: '45 min'
      }, {
        id: 's15',
        title: 'Architecture Discussion',
        date: 'Oct 5',
        duration: '60 min'
      }]
    }
  }
}`,...(B=(E=m.parameters)==null?void 0:E.docs)==null?void 0:B.source}}};var P,A,I;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: args => <TopicCardSelectable {...args} />,
  args: {
    topic: {
      id: '1',
      name: 'Hedy Redesign',
      icon: '🎨',
      sessionCount: 10,
      date: 'Dec 1',
      isFavorite: false
    },
    isSelected: false,
    onSelect: fn()
  }
}`,...(I=(A=u.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var q,H,W;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <TopicCardSelectable {...args} />,
  args: {
    topic: {
      id: '2',
      name: 'Product Launch',
      icon: '🚀',
      sessionCount: 8,
      date: 'Oct 10',
      isFavorite: true
    },
    isSelected: true,
    onSelect: fn()
  }
}`,...(W=(H=p.parameters)==null?void 0:H.docs)==null?void 0:W.source}}};const le=["Default","Favorited","WithSharedBy","FewSessions","ManySessions","SelectableDefault","SelectableSelected"];export{o as Default,d as Favorited,l as FewSessions,m as ManySessions,u as SelectableDefault,p as SelectableSelected,c as WithSharedBy,le as __namedExportsOrder,ce as default};
