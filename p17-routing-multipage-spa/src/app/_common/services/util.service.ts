import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  slugify(text: string): string {
    return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')   // replace spaces & symbols with hyphens
    .replace(/^-+|-+$/g, '');      // remove leading/trailing hyphens
  }

  unslugify(slug: string): string {
    return slug.replace(/-/g, ' ');
  }
}