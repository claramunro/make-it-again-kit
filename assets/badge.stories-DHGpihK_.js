import{j as e}from"./jsx-runtime-ByoxmMqQ.js";import{c as k}from"./index-BwobEAja.js";import{c as q}from"./utils-CytzSlOG.js";import"./iframe-8XAWmlfa.js";import"./preload-helper-C1FmrZbK.js";const z=k("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground",pro:"border-transparent bg-badge-pro text-badge-pro-foreground rounded-md"}},defaultVariants:{variant:"default"}});function r({className:I,variant:W,...U}){return e.jsx("div",{className:q(z({variant:W}),I),...U})}r.__docgenInfo={description:"",methods:[],displayName:"Badge",composes:["VariantProps"]};const K={title:"UI/Badge",component:r,tags:["autodocs"],parameters:{layout:"centered"}},a={args:{children:"Badge"}},s={args:{variant:"secondary",children:"Secondary"}},t={args:{variant:"destructive",children:"Destructive"}},n={args:{variant:"outline",children:"Outline"}},d={args:{variant:"pro",children:"PRO"}},c={args:{variant:"secondary",children:"🎨 Design"}},o={args:{children:"Status"},render:()=>e.jsxs("div",{className:"flex gap-2",children:[e.jsx(r,{variant:"default",children:"Active"}),e.jsx(r,{variant:"secondary",children:"Pending"}),e.jsx(r,{variant:"destructive",children:"Error"}),e.jsx(r,{variant:"outline",children:"Draft"})]})},i={args:{children:"Badge"},render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx("span",{className:"text-sm text-muted-foreground w-24",children:"Default:"}),e.jsx(r,{children:"Badge"})]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx("span",{className:"text-sm text-muted-foreground w-24",children:"Secondary:"}),e.jsx(r,{variant:"secondary",children:"Badge"})]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx("span",{className:"text-sm text-muted-foreground w-24",children:"Destructive:"}),e.jsx(r,{variant:"destructive",children:"Badge"})]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx("span",{className:"text-sm text-muted-foreground w-24",children:"Outline:"}),e.jsx(r,{variant:"outline",children:"Badge"})]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx("span",{className:"text-sm text-muted-foreground w-24",children:"Pro:"}),e.jsx(r,{variant:"pro",children:"PRO"})]})]})};var l,m,g;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    children: 'Badge'
  }
}`,...(g=(m=a.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var u,p,v;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary'
  }
}`,...(v=(p=s.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};var x,f,h;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'destructive',
    children: 'Destructive'
  }
}`,...(h=(f=t.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var B,j,N;n.parameters={...n.parameters,docs:{...(B=n.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline'
  }
}`,...(N=(j=n.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var y,S,b;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'pro',
    children: 'PRO'
  }
}`,...(b=(S=d.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var D,O,P;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: '🎨 Design'
  }
}`,...(P=(O=c.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var w,E,R;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: 'Status'
  },
  render: () => <div className="flex gap-2">
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
}`,...(R=(E=o.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var V,A,_;i.parameters={...i.parameters,docs:{...(V=i.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    children: 'Badge'
  },
  render: () => <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground w-24">Default:</span>
        <Badge>Badge</Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground w-24">Secondary:</span>
        <Badge variant="secondary">Badge</Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground w-24">Destructive:</span>
        <Badge variant="destructive">Badge</Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground w-24">Outline:</span>
        <Badge variant="outline">Badge</Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground w-24">Pro:</span>
        <Badge variant="pro">PRO</Badge>
      </div>
    </div>
}`,...(_=(A=i.parameters)==null?void 0:A.docs)==null?void 0:_.source}}};const L=["Default","Secondary","Destructive","Outline","Pro","WithEmoji","Status","AllVariants"];export{i as AllVariants,a as Default,t as Destructive,n as Outline,d as Pro,s as Secondary,o as Status,c as WithEmoji,L as __namedExportsOrder,K as default};
