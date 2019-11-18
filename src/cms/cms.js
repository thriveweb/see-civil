import CMS from 'netlify-cms'
import './cms-utils'

import HomePagePreview from './preview-templates/HomePagePreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import OperationPagePreview from './preview-templates/OperationPagePreview'
import ArchiveLeadersPreview from './preview-templates/ArchiveLeadersPreview'
import ArchiveProjectsPreview from './preview-templates/ArchiveProjectsPreview'
import CapabilitiesPagePreview from './preview-templates/CapabilitiesPagePreview'
import CareersPagePreview from './preview-templates/CareersPagePreview'
import SingleLeaderPreview from './preview-templates/SingleLeaderPreview'
import SingleProjectPreview from './preview-templates/SingleProjectPreview'

CMS.registerPreviewTemplate('home', HomePagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('operation', OperationPagePreview)
CMS.registerPreviewTemplate('leaders', ArchiveLeadersPreview)
CMS.registerPreviewTemplate('projects', ArchiveProjectsPreview)
CMS.registerPreviewTemplate('capabilities', CapabilitiesPagePreview)
CMS.registerPreviewTemplate('careers', CareersPagePreview)
CMS.registerPreviewTemplate('civilleaders', SingleLeaderPreview)
CMS.registerPreviewTemplate('urbanleaders', SingleLeaderPreview)
CMS.registerPreviewTemplate('quarrysolutionsleaders', SingleLeaderPreview)
CMS.registerPreviewTemplate('groupleaders', SingleLeaderPreview)
CMS.registerPreviewTemplate('civilprojects', SingleProjectPreview)
CMS.registerPreviewTemplate('urbanprojects', SingleProjectPreview)
CMS.registerPreviewTemplate('quarrysolutionsquarries', SingleProjectPreview)
