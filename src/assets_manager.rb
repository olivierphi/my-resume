require 'fileutils'

require 'concerns/project_path_aware'

module Rougemine
    class AssetsManager
        include ProjectPathAware

        def copy_assets
            FileUtils.rm_r File.join(build_path, "assets")
            FileUtils.cp_r assets_path, build_path
        end
    end
end
