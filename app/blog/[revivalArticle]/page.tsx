import { notFound } from 'next/navigation';
import { languages } from '../../../src/features/revival/content';
import RevivalArticle,{revivalMetadata} from '../../../src/features/revival/RevivalArticle';
export const dynamicParams=false;
export function generateStaticParams(){return languages.filter(l=>l.id!=='hawaiian').map(l=>({revivalArticle:l.id+'-language-revival'}));}
export async function generateMetadata({params}:{params:Promise<{revivalArticle:string}>}){const {revivalArticle}=await params;const id=revivalArticle.replace(/-language-revival$/,'');return languages.some(l=>l.id===id)?revivalMetadata(id):{};}
export default async function Page({params}:{params:Promise<{revivalArticle:string}>}){const {revivalArticle}=await params;const id=revivalArticle.replace(/-language-revival$/,'');if(!languages.some(l=>l.id===id))notFound();return <RevivalArticle id={id}/>;}
