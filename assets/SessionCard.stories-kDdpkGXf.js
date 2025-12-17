import{j as e}from"./jsx-runtime-ByoxmMqQ.js";import{L as H,F as Q,B as U}from"./file-text-y4fIgJ_6.js";import{r as W}from"./iframe-8XAWmlfa.js";import{S as $}from"./SessionBadge-BVKj4TGm.js";import{c as p}from"./utils-CytzSlOG.js";import{c as K}from"./createLucideIcon-DSUwoSRr.js";import{S as Y}from"./star-DmJW3ECa.js";import{C as z}from"./chevron-right-PR12MJ5r.js";import"./index-Cdj39i1t.js";import"./preload-helper-C1FmrZbK.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=K("Video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]);function D({session:t,onToggleFavorite:c,isSelected:_,onSelect:u}){const[l,L]=W.useState(t.isFavorite||!1),I=r=>{r.preventDefault(),r.stopPropagation(),L(!l),c==null||c(t.id)},V=r=>{u&&(r.preventDefault(),u(t.id))},q=t.id==="2"?`/session-legacy/${t.id}`:`/session/${t.id}`;return e.jsxs(H,{to:u?"#":q,onClick:V,className:p("group flex w-full items-start gap-4 rounded-xl border border-border bg-card p-4 text-left transition-smooth hover:border-primary/20 hover:shadow-sm",_&&"border-primary bg-primary/5"),children:[e.jsx("div",{className:"mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground",children:t.type==="video"?e.jsx(G,{className:"h-5 w-5"}):e.jsx(Q,{className:"h-5 w-5"})}),e.jsxs("div",{className:"flex-1 space-y-2",children:[e.jsx("h3",{className:"text-sm font-medium leading-snug text-foreground",children:t.title}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx($,{type:t.badge}),e.jsxs("span",{className:"text-xs text-muted-foreground",children:[t.time," • ",t.duration]})]})]}),e.jsx("button",{onClick:I,className:"mt-1 shrink-0 p-1 rounded-md transition-smooth hover:bg-muted",children:e.jsx(Y,{className:p("h-4 w-4 transition-colors",l?"fill-yellow-400 text-yellow-400":"text-muted-foreground/50 group-hover:text-muted-foreground")})}),e.jsx(z,{className:"mt-2 h-4 w-4 shrink-0 text-muted-foreground/50 transition-smooth group-hover:text-muted-foreground"})]})}D.__docgenInfo={description:"",methods:[],displayName:"SessionCard",props:{session:{required:!0,tsType:{name:"Session"},description:""},onToggleFavorite:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},isSelected:{required:!1,tsType:{name:"boolean"},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""}}};const{fn:A}=__STORYBOOK_MODULE_TEST__,oe={title:"Components/SessionCard",component:D,tags:["autodocs"],parameters:{layout:"centered"},decorators:[t=>e.jsx(U,{children:e.jsx("div",{className:"w-[400px]",children:e.jsx(t,{})})})],args:{onToggleFavorite:A()}},s={args:{session:{id:"1",title:"Product Roadmap Planning Q1 2026",badge:"new",time:"2:30 PM",duration:"45 minutes",date:"Nov 4, 2025",type:"document",isFavorite:!1}}},n={args:{session:{id:"2",title:"Design Review: Mobile App Refresh",badge:"workout",time:"2:00 PM",duration:"55 minutes",date:"Oct 22, 2025",type:"video",isFavorite:!0}}},a={args:{session:{id:"3",title:"Weekly Team Standup - Engineering",badge:"new",time:"10:00 AM",duration:"25 minutes",date:"Oct 22, 2025",type:"document",isFavorite:!1},isSelected:!0,onSelect:A()}},i={args:{session:{id:"4",title:"Quarterly Business Review",badge:"new",time:"9:00 AM",duration:"90 minutes",date:"Oct 15, 2025",type:"video",isFavorite:!1}}},o={args:{session:{id:"5",title:"Short Meeting with Robert Baratheon",badge:"coffee",time:"7:16 PM",duration:"1 minutes",date:"Oct 29, 2025",type:"document",isFavorite:!1}}},d={args:{session:{id:"6",title:"Marketing Strategy Discussion",badge:null,time:"1:00 PM",duration:"40 minutes",date:"Oct 15, 2025",type:"document",isFavorite:!1}}},m={args:{session:{id:"7",title:'Innovative Affordable Housing and Development Strategies (Ep. 27: Tour of "Atomic Orchard Experiment" (in Portland) // The Essential Housing Campaign)',badge:"new",time:"4:58 PM",duration:"12 minutes",date:"Nov 4, 2025",type:"video",isFavorite:!0}}};var g,f,v;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    session: {
      id: '1',
      title: 'Product Roadmap Planning Q1 2026',
      badge: 'new',
      time: '2:30 PM',
      duration: '45 minutes',
      date: 'Nov 4, 2025',
      type: 'document',
      isFavorite: false
    }
  }
}`,...(v=(f=s.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var h,y,x;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    session: {
      id: '2',
      title: 'Design Review: Mobile App Refresh',
      badge: 'workout',
      time: '2:00 PM',
      duration: '55 minutes',
      date: 'Oct 22, 2025',
      type: 'video',
      isFavorite: true
    }
  }
}`,...(x=(y=n.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var S,b,w;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    session: {
      id: '3',
      title: 'Weekly Team Standup - Engineering',
      badge: 'new',
      time: '10:00 AM',
      duration: '25 minutes',
      date: 'Oct 22, 2025',
      type: 'document',
      isFavorite: false
    },
    isSelected: true,
    onSelect: fn()
  }
}`,...(w=(b=a.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var M,F,N;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    session: {
      id: '4',
      title: 'Quarterly Business Review',
      badge: 'new',
      time: '9:00 AM',
      duration: '90 minutes',
      date: 'Oct 15, 2025',
      type: 'video',
      isFavorite: false
    }
  }
}`,...(N=(F=i.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var j,O,P;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    session: {
      id: '5',
      title: 'Short Meeting with Robert Baratheon',
      badge: 'coffee',
      time: '7:16 PM',
      duration: '1 minutes',
      date: 'Oct 29, 2025',
      type: 'document',
      isFavorite: false
    }
  }
}`,...(P=(O=o.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var T,k,R;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    session: {
      id: '6',
      title: 'Marketing Strategy Discussion',
      badge: null,
      time: '1:00 PM',
      duration: '40 minutes',
      date: 'Oct 15, 2025',
      type: 'document',
      isFavorite: false
    }
  }
}`,...(R=(k=d.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};var C,E,B;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    session: {
      id: '7',
      title: 'Innovative Affordable Housing and Development Strategies (Ep. 27: Tour of "Atomic Orchard Experiment" (in Portland) // The Essential Housing Campaign)',
      badge: 'new',
      time: '4:58 PM',
      duration: '12 minutes',
      date: 'Nov 4, 2025',
      type: 'video',
      isFavorite: true
    }
  }
}`,...(B=(E=m.parameters)==null?void 0:E.docs)==null?void 0:B.source}}};const de=["Default","Favorited","Selected","VideoType","CoffeeBadge","NoBadge","LongTitle"];export{o as CoffeeBadge,s as Default,n as Favorited,m as LongTitle,d as NoBadge,a as Selected,i as VideoType,de as __namedExportsOrder,oe as default};
