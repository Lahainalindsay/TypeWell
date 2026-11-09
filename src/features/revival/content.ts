import {glossikaAffiliateUrl,glossikaCourses} from '../partners/glossika';
import base from './languages.json';
import expanded from './articles.json';
export const languages = base;
export const articles = expanded as Record<string,{sections:{heading:string;paragraphs:string[]}[];timeline:string[][];sources:{title:string;url:string}[]}>;
export function articlePath(id:string){return `/blog/${id}-language-revival/`;}
export function practicePath(id:string){return id==='hawaiian'?'/haw/hawaiian-typing-test/':`/language-revival/${id}/typing-test/`;}
export const glossikaSource='https://help.glossika.com/en/articles/1245181-which-courses-are-free-do-free-courses-require-a-subscription-or-always-available';
export function glossikaUrl(id:string){return glossikaCourses[id]?glossikaAffiliateUrl:null;}
