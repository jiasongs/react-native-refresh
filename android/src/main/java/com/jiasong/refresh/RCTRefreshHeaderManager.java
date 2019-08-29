package com.jiasong.refresh;

import android.widget.RelativeLayout;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class RCTRefreshHeaderManager extends SimpleViewManager {

    @Override
    public String getName() {
        return "RCTRefreshHeaderManager";
    }

    @Override
    protected EMCallSurfaceView createViewInstance(ThemedReactContext reactContext) {
        return null;
    }

}
