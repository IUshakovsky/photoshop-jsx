-- Run javascript src_name in Photoshop synchronously 
-- Usage from macos: 
--     osascript run_ps_jsx_sync.applescript <script alias>
-- Example:
--     osascript run_ps_jsx_sync.applescript Macintosh HD:Users:IUshakovsky:Projects:Stokar:psjs:merge_layers.jsx

on run src_name
    tell application id "com.adobe.Photoshop" 
        with timeout 7200 seconds
            do javascript alias src_name 
        end timeout
    end tell
end run

