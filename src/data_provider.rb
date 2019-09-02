require "pathname"
require "psych"

require 'concerns/project_path_aware'

module Rougemine
    class DataProvider
        include ProjectPathAware

        def skills
            @skills_data ||= data_from_yaml("skills")["skills"]
        end

        def get_binding
            binding
        end

        private

        def data_from_yaml(file_name)
            Psych.load_file(File.join(data_path, "#{file_name}.yml"))
        end
    end
end
