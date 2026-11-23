// Main categories (domain truth)
export type MainCategory = "" | "synthetic_turf" | "natural_turf" | "line_marker" | "goal" | "debris_blower";

type TurfTag =
    | "brush"
    | "rake"
    | "spreader"
    | "goal"
    | "implement_frame"
    | "sweeper"
    | "top_dresser"
    | "deep_cleaner"
    | "all_in_one_brush_system"
    | "scarifier"
    | "aerator";

// SPORTS
type SportTag = "american_football" | "golf" | "soccer" | "baseball" | "softball" | "lacrosse";

type SportsEquipmentTag =
    | "goal"
    | "post"
    | "net"
    | "flag"
    | "trolley"
    | "official_shelter"
    | "technical_shelter"
    | "anchor"
    | "accessory"
    | "spare"
    | "mannequin"
    | "cone"
    | "training_goal"
    | "pole"
    | "hurdle"
    | "ladder"
    | "training";

type SportsLocationTag = "synthetic_turf" | "natural_turf" | "indoor";

type SportsMaterialTag = "aluminum" | "netting" | "pvc" | "rubber" | "steel";

type SportsAgeTag = "over_18" | "u15_to_u18" | "u13_to_u14" | "u11_to_u12" | "u7_to_u10";

type SoccerGoalCategoryTag = "kids" | "metal" | "plastic" | "mini";
type SoccerGoalNetTag = "junior" | "indoor";
type GoalSubtypeTag =
    | "freestanding"
    | "folding"
    | "hinged"
    | "portable"
    | "self_weighted"
    | "portagoal"
    | "heavyweight"
    | "swivel"
    | "socketed";

// Line Markers
type LineMarkerTag = "paint" | "machine" | "accessory";
type LineMarkerPaintType = "ready_to_use" | "concentrate" | "artificial_grass";
type LineMarkerPaintQuality = "premium" | "professional" | "standard" | "low";
type LineMarkerMachineType = "spray_machine" | "wheel_to_wheel";
type LineMarkerAccessoryType = "field_accessory" | "machine_accessory" | "spare";

type MowerSubtypeTag = "reel_mower" | "rotary_mower" | "hover_mower";

export type Tag =
    | TurfTag
    | SportTag
    | SportsEquipmentTag
    | SportsLocationTag
    | SportsMaterialTag
    | SportsAgeTag
    | SoccerGoalCategoryTag
    | SoccerGoalNetTag
    | LineMarkerTag
    | LineMarkerPaintType
    | LineMarkerPaintQuality
    | LineMarkerMachineType
    | LineMarkerAccessoryType
    | GoalSubtypeTag
    | MowerSubtypeTag;
