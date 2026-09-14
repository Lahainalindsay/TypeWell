import type { Metadata } from "next";

const SITE_URL="https://wpmtest.app";
const canonical=`${SITE_URL}/certificate/sample/`;

export const metadata:Metadata={
 title:"Sample Typing Certificate | WPMTest",
 description:"View a sample WPMTest typing certificate showing the speed, accuracy and test information included after a completed typing test.",
 alternates:{canonical},
 robots:{index:true,follow:true},
 openGraph:{title:"Sample Typing Certificate | WPMTest",description:"See what a WPMTest typing certificate looks like before taking a test.",url:canonical,type:"website"}
};

export default function SampleCertificatePage(){
 const breadcrumb={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"Typing Certificate",item:`${SITE_URL}/typing-certificate/`},{"@type":"ListItem",position:3,name:"Sample Certificate",item:canonical}]};
 return <><main className="tw-standalone">
  <nav className="seo-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span aria-hidden="true">›</span> <a href="/typing-certificate/">Typing Certificate</a> <span aria-hidden="true">›</span> <span>Sample</span></nav>
  <p className="tw-kicker">WPMTest certificate preview</p><h1>Sample Typing Certificate</h1><p className="lead">This public sample shows the information a WPMTest typing certificate can contain after a completed test. The values below are examples only and are not a real person's result.</p>
  <section className="tw-coming" aria-label="Example typing certificate">
   <div style={{textAlign:"center",padding:"2rem 1rem"}}><p style={{letterSpacing:".18em",textTransform:"uppercase",fontWeight:800}}>Certificate of Typing Achievement</p><h2 style={{fontSize:"clamp(2rem,5vw,3.5rem)",margin:"1rem 0"}}>Sample Typist</h2><p>completed a WPMTest typing test</p><div className="tw-standalone-grid"><div className="tw-standalone-card"><h2>62 WPM</h2><p>Typing speed</p></div><div className="tw-standalone-card"><h2>97% Accuracy</h2><p>Typing accuracy</p></div><div className="tw-standalone-card"><h2>5 Minutes</h2><p>Example test length</p></div></div><p style={{marginTop:"1.5rem"}}>SAMPLE — NOT A VERIFIED TEST RESULT</p></div>
  </section>
  <section style={{marginTop:"2rem"}}><h2>Earn your own typing certificate</h2><p>Take a WPMTest typing test and use your completed result to create a personal certificate. WPMTest certificates are site-generated practice records, not accredited professional certifications.</p><p><a href="/5-minute-typing-test/">Take a 5 minute typing test</a> · <a href="/typing-certificate/">Learn about typing certificates</a></p></section>
 </main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}} /></>;
}
