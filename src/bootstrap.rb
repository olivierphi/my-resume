module Rougemine
    class Bootstrap
        class << self
            def boot
                src_dir = __dir__
                return if $LOAD_PATH.include?(src_dir)
                $LOAD_PATH << src_dir 
            end
        end
    end
end
