require 'json'

Pod::Spec.new do |s|
  package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

  s.name          = "RCTRefreshHeader"
  s.version       = package['version']
  s.summary       = package['description']
  s.authors       = { "jiasong" => "" }
  s.homepage      = "https://github.com/jiasongs/react-native-refresh#readme"
  s.license       = "MIT"
  s.platforms     = { :ios => "9.0", :tvos => "9.0" }
  s.framework     = 'UIKit'
  s.requires_arc  = true
  s.source        = { :git => "https://github.com/jiasongs/react-native-refresh.git" }
  s.source_files  = "ios/**/*.{h,m}"

  s.dependency 'React'
  s.dependency 'MJRefresh', '~> 2.0.0'
end