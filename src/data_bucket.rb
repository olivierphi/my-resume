require 'date'
require 'pathname'
require 'psych'
require 'singleton'

require 'concerns/project_path_aware'

module Rougemine
    class DataBucket
        include Singleton
        include ProjectPathAware

        def lang
            @lang ||= ENV.fetch("CV_LANG", "en").to_sym
        end

        def skills
            @skills_data ||= data_from_yaml("skills")["skills"]
        end

        def bio
            @bio_data ||= data_from_yaml("bio.#{lang}")
        end

        def i18n
            @i18n_data ||= data_from_yaml("i18n.#{lang}", symbolize_names: true)
        end

        def now
            @now ||= DateTime.now.iso8601
        end

        def clear_data
            instance_variables.each do |var_name|
                remove_instance_variable var_name
            end
        end

        private

        def data_from_yaml(file_name, symbolize_names: false)
            file_path = File.join(data_path, "#{file_name}.yml")
            file_content = File.read(file_path)
            Psych.load(file_content, symbolize_names: symbolize_names)
        end
    end
end
