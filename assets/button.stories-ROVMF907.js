import{j as i}from"./jsx-runtime-ByoxmMqQ.js";import{r as o}from"./iframe-8XAWmlfa.js";import{c as be}from"./index-BwobEAja.js";import{c as xe}from"./utils-CytzSlOG.js";import{c as ve}from"./createLucideIcon-DSUwoSRr.js";import{C as we}from"./chevron-right-PR12MJ5r.js";import"./preload-helper-C1FmrZbK.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=ve("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=ve("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);function j(e,n){if(typeof e=="function")return e(n);e!=null&&(e.current=n)}function Ce(...e){return n=>{let t=!1;const s=e.map(r=>{const a=j(r,n);return!t&&typeof a=="function"&&(t=!0),a});if(t)return()=>{for(let r=0;r<s.length;r++){const a=s[r];typeof a=="function"?a():j(e[r],null)}}}}function Ee(e){const n=Ne(e),t=o.forwardRef((s,r)=>{const{children:a,...c}=s,l=o.Children.toArray(a),d=l.find(Re);if(d){const u=d.props.children,Se=l.map(N=>N===d?o.Children.count(u)>1?o.Children.only(null):o.isValidElement(u)?u.props.children:null:N);return i.jsx(n,{...c,ref:r,children:o.isValidElement(u)?o.cloneElement(u,void 0,Se):null})}return i.jsx(n,{...c,ref:r,children:a})});return t.displayName=`${e}.Slot`,t}var _e=Ee("Slot");function Ne(e){const n=o.forwardRef((t,s)=>{const{children:r,...a}=t;if(o.isValidElement(r)){const c=Ie(r),l=De(a,r.props);return r.type!==o.Fragment&&(l.ref=s?Ce(s,c):c),o.cloneElement(r,l)}return o.Children.count(r)>1?o.Children.only(null):null});return n.displayName=`${e}.SlotClone`,n}var je=Symbol("radix.slottable");function Re(e){return o.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===je}function De(e,n){const t={...n};for(const s in n){const r=e[s],a=n[s];/^on[A-Z]/.test(s)?r&&a?t[s]=(...l)=>{const d=a(...l);return r(...l),d}:r&&(t[s]=r):s==="style"?t[s]={...r,...a}:s==="className"&&(t[s]=[r,a].filter(Boolean).join(" "))}return{...e,...t}}function Ie(e){var s,r;let n=(s=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:s.get,t=n&&"isReactWarning"in n&&n.isReactWarning;return t?e.ref:(n=(r=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:r.get,t=n&&"isReactWarning"in n&&n.isReactWarning,t?e.props.ref:e.props.ref||e.ref)}const Oe=be("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98]",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-border bg-card hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline",action:"bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:bg-primary/95 active:scale-[0.98]"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-lg px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),_=o.forwardRef(({className:e,variant:n,size:t,asChild:s=!1,...r},a)=>{const c=s?_e:"button";return i.jsx(c,{className:xe(Oe({variant:n,size:t,className:e})),ref:a,...r})});_.displayName="Button";_.__docgenInfo={description:"",methods:[],displayName:"Button",props:{asChild:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}},composes:["VariantProps"]};const{fn:ke}=__STORYBOOK_MODULE_TEST__,Me={title:"UI/Button",component:_,tags:["autodocs"],parameters:{layout:"centered"},args:{onClick:ke()}},p={args:{children:"Button"}},m={args:{variant:"secondary",children:"Secondary"}},g={args:{variant:"destructive",children:"Delete"}},h={args:{variant:"outline",children:"Outline"}},f={args:{variant:"ghost",children:"Ghost"}},v={args:{variant:"link",children:"Link Button"}},y={args:{variant:"action",children:"Start Session"}},S={args:{size:"sm",children:"Small"}},b={args:{size:"lg",children:"Large Button"}},x={args:{size:"icon",children:i.jsx(ye,{className:"h-4 w-4"})}},w={args:{children:i.jsxs(i.Fragment,{children:[i.jsx(ye,{className:"h-4 w-4"}),"Login with Email"]})}},L={args:{children:i.jsxs(i.Fragment,{children:["Next Step",i.jsx(we,{className:"h-4 w-4"})]})}},C={args:{disabled:!0,children:i.jsxs(i.Fragment,{children:[i.jsx(Le,{className:"h-4 w-4 animate-spin"}),"Please wait"]})}},E={args:{disabled:!0,children:"Disabled"}};var R,D,I;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    children: 'Button'
  }
}`,...(I=(D=p.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var O,k,B;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary'
  }
}`,...(B=(k=m.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var z,V,W;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    variant: 'destructive',
    children: 'Delete'
  }
}`,...(W=(V=g.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var P,T,A;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline'
  }
}`,...(A=(T=h.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};var M,F,G;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost'
  }
}`,...(G=(F=f.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var H,U,$;v.parameters={...v.parameters,docs:{...(H=v.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    variant: 'link',
    children: 'Link Button'
  }
}`,...($=(U=v.parameters)==null?void 0:U.docs)==null?void 0:$.source}}};var q,K,Y;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    variant: 'action',
    children: 'Start Session'
  }
}`,...(Y=(K=y.parameters)==null?void 0:K.docs)==null?void 0:Y.source}}};var Z,J,Q;S.parameters={...S.parameters,docs:{...(Z=S.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    size: 'sm',
    children: 'Small'
  }
}`,...(Q=(J=S.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,ee,re;b.parameters={...b.parameters,docs:{...(X=b.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    size: 'lg',
    children: 'Large Button'
  }
}`,...(re=(ee=b.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ne,se,te;x.parameters={...x.parameters,docs:{...(ne=x.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    size: 'icon',
    children: <Mail className="h-4 w-4" />
  }
}`,...(te=(se=x.parameters)==null?void 0:se.docs)==null?void 0:te.source}}};var ae,oe,ie;w.parameters={...w.parameters,docs:{...(ae=w.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    children: <>
        <Mail className="h-4 w-4" />
        Login with Email
      </>
  }
}`,...(ie=(oe=w.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};var ce,le,de;L.parameters={...L.parameters,docs:{...(ce=L.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    children: <>
        Next Step
        <ChevronRight className="h-4 w-4" />
      </>
  }
}`,...(de=(le=L.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ue,pe,me;C.parameters={...C.parameters,docs:{...(ue=C.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: <>
        <Loader2 className="h-4 w-4 animate-spin" />
        Please wait
      </>
  }
}`,...(me=(pe=C.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var ge,he,fe;E.parameters={...E.parameters,docs:{...(ge=E.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Disabled'
  }
}`,...(fe=(he=E.parameters)==null?void 0:he.docs)==null?void 0:fe.source}}};const Fe=["Default","Secondary","Destructive","Outline","Ghost","Link","Action","Small","Large","Icon","WithIcon","WithIconRight","Loading","Disabled"];export{y as Action,p as Default,g as Destructive,E as Disabled,f as Ghost,x as Icon,b as Large,v as Link,C as Loading,h as Outline,m as Secondary,S as Small,w as WithIcon,L as WithIconRight,Fe as __namedExportsOrder,Me as default};
