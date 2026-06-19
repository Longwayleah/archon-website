/**
 * Asset paths for Blender → GLB pipeline and hero media.
 * Export from Blender: glTF Binary (.glb), Y-up, apply transforms.
 */

export const models = {
  vial: "/models/archon-vial.glb",
  vialSketchfab: "/models/archon-vial-sketchfab.glb",
  handVial: "/models/hand-vial.glb",
  handTest: "/models/hand-test.glb",
} as const;

export const vialTextures = {
  dir: "/models/archon-vial-textures",
  baseColorArchon: "/models/archon-vial-textures/Vial_BaseColor_archon.png",
  baseColor: "/models/archon-vial-textures/Vial_BaseColor.png",
  metallic: "/models/archon-vial-textures/Vial_Metallic.png",
  roughness: "/models/archon-vial-textures/Vial_Roughness.png",
  normal: "/models/archon-vial-textures/Vial_NormalOpenGL.png",
  transmission: "/models/archon-vial-textures/Vial_Transmission.png",
} as const;

export const images = {
  heroAtmosphere: "/images/hero-atmosphere.png",
  heroAtmosphere2x: "/images/Hero-atmosphere@2x.png",
  heroBackground: "/images/hero-image.png",
  poweredByMolecule: "/images/powered-by-molecule.png",
  featuredProtocolBackground: "/images/ribbon-without-glow.png",
  elevateRoutineBackground: "/images/elevate-routine-background.png",
  footerBackground: "/images/footer-background.png",
  menuBackground: "/images/menu-background.png",
  standardsWall: "/images/standards-sticky-wall.png",
} as const;

export type ModelKey = keyof typeof models;
