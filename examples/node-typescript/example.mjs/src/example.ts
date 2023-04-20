/*!
This file is part of CycloneDX JavaScript Library.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

SPDX-License-Identifier: Apache-2.0
Copyright (c) OWASP Foundation. All Rights Reserved.
*/

/** Example how to serialize a Bom to JSON / XML. */

import * as CDX from '@cyclonedx/cyclonedx-library'
// full Library is available as `CDX`, now

const bom = new CDX.Models.Bom()
bom.metadata.component = new CDX.Models.Component(
  CDX.Enums.ComponentType.Application,
  'MyProject'
)
const componentA = new CDX.Models.Component(
  CDX.Enums.ComponentType.Library,
  'myComponentA'
)
bom.components.add(componentA)
bom.metadata.component.dependencies.add(componentA.bomRef)

const serializeSpec = CDX.Spec.Spec1dot4

const jsonSerializer = new CDX.Serialize.JsonSerializer(
  new CDX.Serialize.JSON.Normalize.Factory(serializeSpec))
const serializedJson = jsonSerializer.serialize(bom)
console.log(serializedJson)
try {
  const jsonValidator = new CDX.Validation.JsonStrictValidator(serializeSpec.version)
  jsonValidator.validate(serializedJson)
} catch (err) {
  if (!(err instanceof CDX.Validation.MissingOptionalDependencyError)) {
    console.error('invalid SBOM', err)
  }
}

const xmlSerializer = new CDX.Serialize.XmlSerializer(
  new CDX.Serialize.XML.Normalize.Factory(serializeSpec))
const serializedXML = xmlSerializer.serialize(bom)
console.log(serializedXML)
try {
  const xmlValidator = new CDX.Validation.XmlValidator(serializeSpec.version)
  xmlValidator.validate(serializedXML)
} catch (err) {
  if (!(err instanceof CDX.Validation.MissingOptionalDependencyError)) {
    console.error('invalid SBOM', err)
  }
}
