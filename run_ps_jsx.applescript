-- Run javascript src_name in Photoshop asynchronously 
-- Usage from macos: 
--     osascript run_ps_jsx.applescript <script alias>
-- Example:
--     osascript run_ps_jsx.applescript Macintosh HD:Users:IUshakovsky:Projects:Stokar:psjs:merge_layers.jsx

on run src_name
    tell application id "com.adobe.Photoshop" 
        ignoring application responses 
            do javascript alias src_name 
        end ignoring
    end tell
end run

