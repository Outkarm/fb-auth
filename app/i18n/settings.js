export const fallbackLng = "en-SG";
export const languages = [fallbackLng, "ar-SA", "fr-FR", "id-ID", "zh-CN", "de-DE", "it-IT"];
export const defaultNS = "page";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
