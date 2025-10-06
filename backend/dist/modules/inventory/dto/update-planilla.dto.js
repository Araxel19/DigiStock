"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlanillaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_planilla_dto_1 = require("./create-planilla.dto");
class UpdatePlanillaDto extends (0, mapped_types_1.PartialType)(create_planilla_dto_1.CreatePlanillaDto) {
}
exports.UpdatePlanillaDto = UpdatePlanillaDto;
//# sourceMappingURL=update-planilla.dto.js.map